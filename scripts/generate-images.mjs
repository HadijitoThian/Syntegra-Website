#!/usr/bin/env node
// One-shot image generator using DeepInfra's Flux 1.1 Pro.
// Run: node scripts/generate-images.mjs
// Outputs JPEG files to public/generated/<name>.jpg

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "generated");

// Load env from .env.local
const envPath = path.join(ROOT, ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) process.env[m[1]] = m[2];
  }
}

const KEY = process.env.DEEPINFRA_API_KEY;
if (!KEY) {
  console.error("DEEPINFRA_API_KEY not set");
  process.exit(1);
}

const ENDPOINT = "https://api.deepinfra.com/v1/inference/black-forest-labs/FLUX-1.1-pro";

const STYLE = "photorealistic, professional editorial photography, sharp focus, natural daylight, warm cinematic tones, shallow depth of field, premium brand commercial style";

const IMAGES = [
  {
    name: "hero",
    width: 1216,
    height: 832,
    prompt: `A confident young Indonesian woman entrepreneur in her early thirties smiling warmly, holding a smartphone, standing in a bright modern co-working space in Jakarta with floor-to-ceiling windows, soft morning light, blurred laptops and plants in background, ${STYLE}`,
  },
  {
    name: "who-we-are",
    width: 1024,
    height: 1024,
    prompt: `A small diverse team of four young Indonesian professionals — two men and two women in casual smart attire — collaborating enthusiastically around a wooden table with laptops and notebooks in a bright minimal Jakarta office, candid documentary moment, natural side light from window, plants and brick wall in background, ${STYLE}`,
  },
  {
    name: "product-social",
    width: 1216,
    height: 832,
    prompt: `Close-up product photograph of a smartphone held in a person's hand displaying a colorful Indonesian small-business e-commerce landing page with product photos and bold Bahasa Indonesia headlines, blurred bright cafe background, premium phone mockup feel, ${STYLE}`,
  },
  {
    name: "product-pos",
    width: 1216,
    height: 832,
    prompt: `A modern tablet point-of-sale system on a clean light-wood counter at an Indonesian specialty coffee shop, screen displaying a colorful sales dashboard with charts and Bahasa Indonesia menu items, friendly barista barely visible in background, warm afternoon light, ${STYLE}`,
  },
  {
    name: "product-synthia",
    width: 1216,
    height: 832,
    prompt: `Close-up shot of a smartphone held by a hand, screen showing a polished chat conversation with an AI voice assistant in Bahasa Indonesia, microphone icon glowing, blurred warm Jakarta cafe background with bokeh lights, golden hour light, ${STYLE}`,
  },
  {
    name: "blog-cover",
    width: 1216,
    height: 700,
    prompt: `An Indonesian small shop owner — a friendly middle-aged woman — using a laptop on the counter of her warung surrounded by colorful products, warm interior light, documentary editorial photography, ${STYLE}`,
  },
  // "What We Solve" vignettes — show the PAIN, candid documentary style
  {
    name: "pain-content",
    width: 1024,
    height: 768,
    prompt: `A tired young Indonesian shop owner sitting in her small clothing boutique, staring blankly at her smartphone screen, trying to think of what to post on Instagram, paper notes scattered around, late afternoon natural light, candid documentary photography, slightly melancholic mood, ${STYLE}`,
  },
  {
    name: "pain-pos",
    width: 1024,
    height: 768,
    prompt: `An overwhelmed Indonesian cashier at the counter of a small warung surrounded by messy paper receipts, handwritten notebooks, and a calculator, looking stressed while customers wait, fluorescent shop light, candid documentary photography, ${STYLE}`,
  },
  {
    name: "pain-admin",
    width: 1024,
    height: 768,
    prompt: `An Indonesian small business owner in her early thirties juggling two phones with multiple notification badges showing on WhatsApp, looking overwhelmed and tired, surrounded by inventory boxes in a small shop, warm interior light, candid documentary photography, ${STYLE}`,
  },
  {
    name: "pain-foreign-tools",
    width: 1024,
    height: 768,
    prompt: `A confused Indonesian entrepreneur staring at his laptop showing several complex English software dashboards, rubbing his forehead, sticky notes and a calculator on the desk, soft natural daylight in a modest home office, candid documentary photography, ${STYLE}`,
  },
];

async function generate(spec) {
  const out = path.join(OUT_DIR, `${spec.name}.jpg`);
  if (fs.existsSync(out) && !process.argv.includes("--force")) {
    console.log(`[${spec.name}] ✓ skip (already exists) — pass --force to regenerate`);
    return;
  }
  console.log(`[${spec.name}] generating…`);
  const t0 = Date.now();
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `bearer ${KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: spec.prompt,
      width: spec.width,
      height: spec.height,
      output_format: "jpeg",
    }),
  });
  if (!res.ok) {
    throw new Error(`[${spec.name}] HTTP ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  if (json.status !== "ok" || !json.image_url) {
    throw new Error(`[${spec.name}] bad response: ${JSON.stringify(json).slice(0, 300)}`);
  }
  const dl = await fetch(json.image_url);
  if (!dl.ok) throw new Error(`[${spec.name}] download HTTP ${dl.status}`);
  const buf = Buffer.from(await dl.arrayBuffer());
  fs.writeFileSync(out, buf);
  console.log(
    `[${spec.name}] ✓ ${(buf.length / 1024).toFixed(0)} KB in ${((Date.now() - t0) / 1000).toFixed(1)}s — cost $${json.inference_status?.cost ?? "?"}`
  );
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  // Run in parallel — DeepInfra handles concurrency fine
  const results = await Promise.allSettled(IMAGES.map(generate));
  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length) {
    for (const f of failed) console.error(String(f.reason));
    process.exit(1);
  }
  const totalCost = (IMAGES.length * 0.04).toFixed(2);
  console.log(`\nAll done. ~$${totalCost} total. Files in public/generated/`);
})();
