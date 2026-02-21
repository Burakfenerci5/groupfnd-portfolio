import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

interface ScreenPlan {
  title: string;
  subtitle: string;
  elements: string;
}

/* ------------------------------------------------------------------ */
/*  Step 1: Use an LLM to break the user's idea into 6 app screens   */
/* ------------------------------------------------------------------ */

async function planScreens(
  replicate: Replicate,
  userIdea: string
): Promise<ScreenPlan[]> {
  const prompt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>
You are a senior product strategist who designs apps. Given an app idea, you must decompose it into exactly 6 SCREENS that cover the full scope of the product.

THINK DEEPLY about the idea. The 6 screens should cover:
- Screen 1: The main dashboard or landing experience (overview, key metrics, navigation)
- Screen 2-5: The CORE FEATURES of the app. Each screen tackles a distinct, substantial part of the idea. Think about what the user actually needs to DO in this app. Not generic pages — screens specific to THIS idea.
- Screen 6: An advanced or analytical view (reports, comparisons, settings, or AI features)

OUTPUT FORMAT (strict — no markdown, no bullets, no numbering, no extra text):

SCREEN: Descriptive Title
SUB: One sentence about what the user accomplishes on this screen
UI: exactly 5 specific, drawable UI elements separated by commas

RULES for UI elements — every element must be something a wireframe artist can draw:
Good examples: "comparison table with 4 columns for Flow vs Apex vs Validation Rules vs Platform Events", "decision tree flowchart with yes/no branches leading to recommendations", "3 large cards showing pattern name and code snippet preview and use-case tag", "sidebar navigation with collapsible topic categories", "pie chart breaking down automation types used"
Bad examples: "text content", "images", "information", "details", "data"

Separate each screen with one blank line. Output NOTHING before the first SCREEN or after the last UI line.<|eot_id|><|start_header_id|>user<|end_header_id|>
App idea: ${userIdea}<|eot_id|><|start_header_id|>assistant<|end_header_id|>
SCREEN:`;

  const output = await replicate.run(
    "meta/meta-llama-3-70b-instruct" as `${string}/${string}`,
    {
      input: {
        prompt,
        max_tokens: 900,
        temperature: 0.5,
      },
    }
  );

  let text = "";
  if (typeof output === "string") {
    text = output;
  } else if (Array.isArray(output)) {
    text = output.join("");
  } else if (output && Symbol.asyncIterator in Object(output)) {
    for await (const chunk of output as AsyncIterable<string>) {
      text += chunk;
    }
  } else {
    text = String(output);
  }

  // Prepend "SCREEN:" since the prompt already started the first one
  text = "SCREEN:" + text;

  return parseScreenPlan(text);
}

function parseScreenPlan(raw: string): ScreenPlan[] {
  // Strip markdown artifacts
  const clean = raw
    .replace(/\*\*/g, "")
    .replace(/^#+\s.*/gm, "")
    .replace(/^[-*]\s/gm, "");

  const blocks = clean.split(/\n\s*\n/).filter((b) => b.includes("SCREEN:"));
  const screens: ScreenPlan[] = [];

  for (const block of blocks) {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let title = "";
    let subtitle = "";
    let elements = "";

    for (const line of lines) {
      if (line.startsWith("SCREEN:")) title = line.replace("SCREEN:", "").trim();
      else if (line.startsWith("SUB:")) subtitle = line.replace("SUB:", "").trim();
      else if (line.startsWith("SUBTITLE:")) subtitle = line.replace("SUBTITLE:", "").trim();
      else if (line.startsWith("UI:")) elements = line.replace("UI:", "").trim();
      else if (line.startsWith("ELEMENTS:")) elements = line.replace("ELEMENTS:", "").trim();
    }

    if (title && elements) {
      screens.push({ title, subtitle, elements });
    }
  }

  return screens.slice(0, 6);
}

/* ------------------------------------------------------------------ */
/*  Step 2: Convert LLM screen plan into a FLUX image prompt          */
/* ------------------------------------------------------------------ */

function buildImagePrompt(screens: ScreenPlan[]): string {
  const positions = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  const screenDescriptions = screens
    .map(
      (s, i) =>
        `The ${positions[i] || `screen ${i + 1}`} screen is titled "${s.title}" in large bold handwriting. Below the title: "${s.subtitle}". Inside it, draw: ${s.elements}.`
    )
    .join("\n\n");

  return `A hand-drawn UX wireframe sketch. Black pen ink on white paper, clean lines, professional product design sketchbook style. Six app screens in a 3-column 2-row grid layout. Each screen inside a browser frame with three dots at the top-left.

${screenDescriptions}

Style: black ink only, no color. Each screen title is written in large bold handwriting at the top of its frame. Draw specific UI elements inside each screen — cards, bar charts, lists, buttons, navigation tabs, forms, toggles, tables. Add small handwritten annotations and arrows. Each screen has a unique layout. Professional UX presentation quality.`;
}

/* ------------------------------------------------------------------ */
/*  Retry helper for Replicate 429 rate limits                         */
/* ------------------------------------------------------------------ */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function runWithRetry(
  replicate: Replicate,
  model: `${string}/${string}`,
  input: Record<string, unknown>,
  maxRetries = 3
): Promise<unknown> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await replicate.run(model, { input });
    } catch (err: unknown) {
      const is429 =
        err instanceof Error && err.message?.includes("429");

      if (is429 && attempt < maxRetries) {
        const waitSec = 5 + attempt * 3;
        console.log(`Rate limited (429). Waiting ${waitSec}s before retry ${attempt + 1}...`);
        await sleep(waitSec * 1000);
        continue;
      }
      throw err;
    }
  }
  throw new Error("Max retries exceeded");
}

/* ------------------------------------------------------------------ */
/*  Main API handler                                                   */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "API configuration error. Please contact support." },
        { status: 500 }
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    // Step 1: LLM breaks the idea into 6 specific screens
    console.log("Step 1: Planning screens for:", prompt);
    const screens = await planScreens(replicate, prompt);
    console.log(
      "Parsed screens:",
      screens.map((s) => s.title)
    );

    if (screens.length < 3) {
      console.warn("LLM returned fewer than 3 screens, using fallback");
    }

    // Step 2: Build a highly specific FLUX prompt from the structured screens
    const imagePrompt = buildImagePrompt(screens);
    console.log("Image prompt length:", imagePrompt.length);

    // Brief pause to avoid hitting Replicate's burst rate limit
    // (Llama call consumes the burst; FLUX needs the rate to reset)
    console.log("Waiting 5s for rate limit reset...");
    await sleep(5000);

    // Step 3: Generate the wireframe with FLUX (with retry for 429s)
    console.log("Step 3: Generating wireframe...");
    const output = await runWithRetry(
      replicate,
      "black-forest-labs/flux-1.1-pro" as `${string}/${string}`,
      {
        prompt: imagePrompt,
        aspect_ratio: "16:9",
        output_format: "jpg",
        safety_tolerance: 5,
      }
    );

    const imageUrl = String(output);

    if (!imageUrl || !imageUrl.startsWith("http")) {
      throw new Error("No valid image URL returned from Replicate");
    }

    return NextResponse.json({ url: imageUrl });
  } catch (error: unknown) {
    console.error("Error generating sketch:", error);

    return NextResponse.json(
      {
        error: "Failed to generate sketch. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
