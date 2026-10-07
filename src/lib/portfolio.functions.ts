import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const classifyPortfolioPhoto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({ dataUrl: z.string().startsWith("data:image/").max(4_000_000) })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { data: isOwner } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isOwner) return { category: null, error: "Only the salon owner can do this." };

    const { classifyImage, ClassifyError } = await import("./classify-photo.server");
    try {
      return { category: await classifyImage(data.dataUrl), error: null };
    } catch (error) {
      const message = error instanceof ClassifyError ? error.message : "Something went wrong.";
      return { category: null, error: message };
    }
  });
