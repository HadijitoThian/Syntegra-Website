import { NextResponse } from "next/server";
import { z } from "zod";
import { getAnthropic, HAIKU_MODEL } from "@/lib/anthropic";

export const runtime = "nodejs";

const bodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().min(8),
  business: z.string().optional(),
  industry: z.string().min(1),
  challenge: z.string().min(20),
  products: z.array(z.string()).min(1),
});

const SYSTEM_PROMPT = `You are a lead qualification assistant for Syntegra, an AI solutions company serving Indonesian SMEs. Given a prospect's challenge description, industry, and product interest, output a JSON object with:
{
  "summary": "<one-sentence summary of their need in English>",
  "fit_score": <1-10, how well Syntegra's existing products fit their need>,
  "recommended_product": "social-media-builder" | "pos" | "synthia" | "custom",
  "urgency": "low" | "medium" | "high",
  "next_step_id": "<one-sentence suggested next step in Bahasa Indonesia, addressed to the prospect>"
}
Output ONLY valid JSON, no markdown, no preamble.`;

export async function POST(req: Request) {
  let payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }

  const { name, email, whatsapp, business, industry, challenge, products } = parsed.data;

  // TODO: persist this lead (e.g. to Supabase, Notion, or email).
  console.log("[lead] new submission", { name, email, whatsapp, business, industry });

  const userText = `Industry: ${industry}
Product interest: ${products.join(", ")}
Challenge: ${challenge}`;

  try {
    const client = getAnthropic();
    const resp = await client.messages.create({
      model: HAIKU_MODEL,
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userText }],
    });

    const text = resp.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("")
      .trim();

    let qualification;
    try {
      const cleaned = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
      qualification = JSON.parse(cleaned);
    } catch {
      qualification = {
        summary: "Lead needs follow-up.",
        fit_score: 6,
        recommended_product: "custom",
        urgency: "medium",
        next_step_id:
          "Tim kami akan menghubungi Anda via WhatsApp untuk diskusi lebih lanjut.",
      };
    }

    return NextResponse.json({ qualification });
  } catch (err) {
    console.error("[lead] anthropic error", err);
    return NextResponse.json(
      {
        qualification: {
          summary: "Lead needs manual follow-up.",
          fit_score: 5,
          recommended_product: "custom",
          urgency: "medium",
          next_step_id:
            "Tim kami akan menghubungi Anda via WhatsApp dalam 1×24 jam.",
        },
      },
      { status: 200 }
    );
  }
}
