import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => pageHead(
    "The Little Hair Shop | Hair Salon in Point Loma, San Diego",
    "Women-owned, appointment-only Point Loma hair salon for custom color, babylights, balayage, color correction, and hair extensions.",
    "/",
  ),
  component: HomePage,
});

const credentials = [
  ["5.0", "Rated on Google"],
  ["10+ years", "Of client loyalty"],
  ["Extensions", "Tape-in · Micro-tab · Sew-in"],
  ["Women-owned", "In Point Loma"],
];

const signatures = [
  ["Extensions", "We cut every set of extensions to blend with your own hair, so the added length looks natural."],
  ["Babylights", "Fine, soft highlights brighten your color, and a bond builder protects your hair while it lightens."],
  ["Transformations", "We take on color corrections and dramatic changes, including the change from black to platinum."],
];

function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-frame">
          <span className="frame-diamond frame-diamond-top" aria-hidden="true" />
          <p className="eyebrow">Point Loma · San Diego</p>
          <h1 className="hero-script">The Little Hair Shop</h1>
          <p className="hero-sub">Hair Salon</p>
          <span className="frame-diamond frame-diamond-bottom" aria-hidden="true" />
        </div>
      </section>

      <section className="intro-section content-width">
        <h2>The Little Hair Shop is a private Point Loma salon for <span className="foil-text">color and extensions.</span></h2>
        <p>Owner and colorist Sandy DeBoer leads the salon on Rosecrans Street. We see clients by appointment only and tailor each color and cut to the person in the chair.</p>
        <div className="button-row">
          <Button asChild><Link to="/portfolio">See the Work</Link></Button>
          <Button asChild variant="outline"><Link to="/services">See the Menu</Link></Button>
        </div>
      </section>

      <section className="credentials content-width" aria-label="Credentials">
        {credentials.map(([value, label]) => (
          <div className="credential" key={value}>
            <strong className="foil-text">{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="signatures content-width">
        <p className="eyebrow">Signatures</p>
        <h2>What We Do Best</h2>
        <div className="signature-grid">
          {signatures.map(([title, body]) => (
            <article key={title}>
              <span className="gold-diamond" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="featured-review">
        <div className="review-inner content-width">
          <p className="eyebrow">Five Stars on Google</p>
          <blockquote>“I feel like a Barbie doll whenever I leave because it is her goal to have me walk out her door looking and feeling my best.”</blockquote>
          <p className="review-credit">Marisa R. · Google</p>
          <Button asChild variant="outline"><Link to="/reviews">Read All Reviews</Link></Button>
        </div>
      </section>
    </main>
  );
}
