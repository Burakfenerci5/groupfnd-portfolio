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

    const finalPrompt = `A breathtaking, high-end UI/UX design concept for: ${prompt}. Dark mode, sleek modern web application interface, glowing neon blue and purple accents, glassmorphism panels, perfectly aligned grid layout, professional Dribbble and Behance style, 8k resolution, highly detailed, masterpiece.`;

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
