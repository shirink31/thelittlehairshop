import { createOpenAI } from "@ai-sdk/openai";
import { NoObjectGeneratedError, Output, streamText } from "ai";
import { z } from "zod";

export const CATEGORIES = ["Balayage", "Extensions", "Babylights", "Bridal"] as const;
export type Category = (typeof CATEGORIES)[number];

const RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

function createRunIdFetch() {
  let runId: string | undefined;
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    if (runId && !headers.has(RUN_ID_HEADER)) headers.set(RUN_ID_HEADER, runId);
    const response = await fetch(input, { ...init, headers });
    runId ??= response.headers.get(RUN_ID_HEADER)?.trim() || undefined;
    return response;
  };
}

const schema = z.object({
  category: z.enum(CATEGORIES),
});

export class ClassifyError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export async function classifyImage(dataUrl: string): Promise<Category> {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) throw new ClassifyError("AI is not configured yet.", 401);

  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: createRunIdFetch(),
  });

  let streamError: unknown;
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    instructions:
      "You sort hair salon portfolio photos. Pick exactly one category: Balayage (hand-painted, soft blended lightening), Babylights (very fine, delicate highlights throughout), Extensions (added length or volume, tape-in, micro-tab, sew-in, before/after length), Bridal (wedding or formal styled updos, veils, bridal parties). If several apply, choose the most prominent.",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Which category best fits this photo?" },
          { type: "file", mediaType: "image/jpeg", data: new URL(dataUrl) },
        ],
      },
    ],
    output: Output.object({ schema }),
    onError: ({ error }) => {
      streamError = error;
    },
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  try {
    const output = await result.output;
    return output.category;
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      const match = CATEGORIES.find((c) => error.text?.includes(c));
      if (match) return match;
      throw new ClassifyError("The AI could not decide. Please pick a category yourself.", 422);
    }
    const err = (streamError ?? error) as { statusCode?: number; message?: string };
    const status = err?.statusCode ?? 500;
    if (status === 402) throw new ClassifyError("AI credits have run out. Please pick a category yourself.", 402);
    if (status === 429) throw new ClassifyError("The AI is busy right now. Please try again in a minute.", 429);
    if (status === 403) throw new ClassifyError("AI access is not available right now. Please pick a category yourself.", 403);
    console.error("classifyImage failed", error);
    throw new ClassifyError("The AI could not look at this photo. Please pick a category yourself.", status);
  }
}
