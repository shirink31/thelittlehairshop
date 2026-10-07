import { supabase } from "@/integrations/supabase/client";

export const PORTFOLIO_CATEGORIES = ["Balayage", "Extensions", "Babylights", "Bridal"] as const;
export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export type PortfolioPhoto = {
  id: string;
  category: PortfolioCategory;
  image_path: string;
  created_at: string;
  url: string | null;
};

export async function fetchPortfolioPhotos(): Promise<PortfolioPhoto[]> {
  const { data, error } = await supabase
    .from("portfolio_photos")
    .select("id, category, image_path, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  if (!data.length) return [];
  const { data: signed } = await supabase.storage
    .from("portfolio")
    .createSignedUrls(data.map((p) => p.image_path), 60 * 60 * 24);
  return data.map((p, i) => ({
    ...(p as Omit<PortfolioPhoto, "url">),
    url: signed?.[i]?.signedUrl ?? null,
  }));
}

/** Shrink an image file to a JPEG data URL with the longest side at most `max` px. */
export async function resizeImage(file: File, max: number, quality = 0.85): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}

export function dataUrlToBlob(dataUrl: string): Blob {
  const [head, body] = dataUrl.split(",");
  const mime = head.match(/data:(.*?);/)?.[1] ?? "image/jpeg";
  const bytes = atob(body);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}
