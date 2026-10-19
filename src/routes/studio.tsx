import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { classifyPortfolioPhoto } from "@/lib/portfolio.functions";
import {
  PORTFOLIO_CATEGORIES,
  dataUrlToBlob,
  fetchPortfolioPhotos,
  resizeImage,
  type PortfolioCategory,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio | The Little Hair Shop" },
      { name: "description", content: "Private page for the salon owner to add portfolio photos." },
      { property: "og:title", content: "Studio | The Little Hair Shop" },
      { property: "og:description", content: "Private page for the salon owner to add portfolio photos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isOwner, setIsOwner] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return setIsOwner(null);
    supabase.rpc("claim_owner").then(({ data }) => setIsOwner(Boolean(data)));
  }, [session]);

  return (
    <main>
      <PageHeader label="Studio" title="Add to the Portfolio" />
      <section className="studio-section content-width">
        {!ready ? null : !session ? (
          <SignIn />
        ) : isOwner === null ? (
          <p>Checking your account...</p>
        ) : !isOwner ? (
          <div className="studio-form">
            <p>This page is only for the salon owner.</p>
            <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
          </div>
        ) : (
          <Uploader onSignOut={() => supabase.auth.signOut()} />
        )}
      </section>
    </main>
  );
}

function SignIn() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/studio` },
      });
      if (error) setMessage(error.message);
      else if (!data.session) setMessage("Check your email for a link to confirm your account, then sign in here.");
    }
    setBusy(false);
  }

  return (
    <form className="studio-form" onSubmit={submit}>
      <label htmlFor="email">Email</label>
      <input id="email" className="studio-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" className="studio-input" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" disabled={busy}>{mode === "in" ? "Sign in" : "Create account"}</Button>
      <Button type="button" variant="outline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "First time? Create account" : "Have an account? Sign in"}
      </Button>
      {message && <p className="studio-message">{message}</p>}
    </form>
  );
}

function Uploader({ onSignOut }: { onSignOut: () => void }) {
  const classify = useServerFn(classifyPortfolioPhoto);
  const queryClient = useQueryClient();
  const { data: photos = [] } = useQuery({ queryKey: ["portfolio-photos"], queryFn: fetchPortfolioPhotos });
  const [preview, setPreview] = useState<string | null>(null);
  const [aiPick, setAiPick] = useState<PortfolioCategory | null>(null);
  const [choice, setChoice] = useState<PortfolioCategory | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setAiPick(null);
    setChoice(null);
    setBusy(true);
    setStatus("Looking at your photo...");
    try {
      const full = await resizeImage(file, 1800);
      setPreview(full);
      const small = await resizeImage(file, 1024, 0.8);
      const res = await classify({ data: { dataUrl: small } });
      if (res.category) {
        setAiPick(res.category);
        setChoice(res.category);
        setStatus(`This looks like ${res.category}. Change it below if that is not right.`);
      } else {
        setStatus(res.error ?? "Please pick a category.");
      }
    } catch {
      setStatus("That photo could not be read. Please try a JPEG or PNG.");
    }
    setBusy(false);
  }

  async function save() {
    if (!preview || !choice) return;
    setBusy(true);
    setStatus("Saving...");
    const path = `${crypto.randomUUID()}.jpg`;
    const { error: upErr } = await supabase.storage.from("portfolio").upload(path, dataUrlToBlob(preview), { contentType: "image/jpeg" });
    if (upErr) {
      setStatus("The photo could not be saved. Please try again.");
      return setBusy(false);
    }
    const { error } = await supabase.from("portfolio_photos").insert({ image_path: path, category: choice, ai_category: aiPick });
    if (error) {
      setStatus("The photo could not be saved. Please try again.");
      return setBusy(false);
    }
    await queryClient.invalidateQueries({ queryKey: ["portfolio-photos"] });
    setPreview(null);
    setAiPick(null);
    setChoice(null);
    setStatus(`Saved to ${choice}. It now shows on the Portfolio page.`);
    setBusy(false);
  }

  async function remove(id: string, path: string) {
    if (!confirm("Remove this photo from the portfolio?")) return;
    await supabase.from("portfolio_photos").delete().eq("id", id);
    await supabase.storage.from("portfolio").remove([path]);
    queryClient.invalidateQueries({ queryKey: ["portfolio-photos"] });
  }

  return (
    <div className="studio-form">
      <label htmlFor="photo">Choose a photo</label>
      <input id="photo" className="studio-input" type="file" accept="image/*" disabled={busy} onChange={(e) => onFile(e.target.files?.[0])} />
      {preview && (
        <div className="studio-preview"><img src={preview} alt="Selected photo" /></div>
      )}
      {status && <p className="studio-message" role="status">{status}</p>}
      {preview && (
        <>
          <label>Category</label>
          <div className="studio-choices">
            {PORTFOLIO_CATEGORIES.map((c) => (
              <button key={c} type="button" className="studio-choice" aria-pressed={choice === c} onClick={() => setChoice(c)}>
                {c}
              </button>
            ))}
          </div>
          <Button onClick={save} disabled={busy || !choice}>Save to portfolio</Button>
        </>
      )}
      <Button variant="outline" onClick={onSignOut}>Sign out</Button>

      {photos.length > 0 && (
        <div className="studio-list">
          {photos.map((p) => (
            <figure key={p.id}>
              {p.url && <img src={p.url} alt={p.category} />}
              <figcaption>
                {p.category}
                <button type="button" onClick={() => remove(p.id, p.image_path)}>Remove</button>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
