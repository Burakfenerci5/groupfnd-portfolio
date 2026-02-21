import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      console.error("REPLICATE_API_TOKEN is not configured");
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

    // Build a prompt that weaves the user's specific idea into every screen
    const finalPrompt = `A professional hand-drawn UX wireframe sketch on white paper showing 6 app screens in a 3x2 grid, each inside a browser frame. Black pen ink, clean lines, UX designer sketchbook style.

This is a wireframe for: ${prompt}

CRITICAL: Each of the 6 screens MUST have a large, clear handwritten title at the top and show UI elements SPECIFIC to the idea described above. The screens should show:
- Screen 1: The dashboard/home screen with a welcome header, key metrics cards, and quick-action buttons relevant to the app idea
- Screen 2: The main content list view with filterable cards, tags, and category tabs specific to the features described
- Screen 3: A detail/editor view showing a form or content page with rich fields, dropdowns, and action buttons
- Screen 4: A comparison or decision-tree view with a side-by-side layout or flowchart showing choices
- Screen 5: A settings or configuration panel with toggles, checkboxes and option groups
- Screen 6: An analytics/reporting view with hand-drawn charts, graphs, and summary stats

Every screen must have handwritten labels and annotations that directly reference the specific concepts from the app idea. The wireframe should make someone immediately understand what this application does just by looking at the sketches.`;

    const output = await replicate.run(
      "black-forest-labs/flux-1.1-pro" as `${string}/${string}`,
      {
        input: {
          prompt: finalPrompt,
          aspect_ratio: "16:9",
          output_format: "jpg",
          safety_tolerance: 5,
        },
      }
    );

    // FLUX returns a FileOutput object — String() extracts the URL
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
