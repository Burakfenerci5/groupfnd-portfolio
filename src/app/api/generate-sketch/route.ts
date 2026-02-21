import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(request: NextRequest) {
  try {
    // Check for API token first
    if (!process.env.REPLICATE_API_TOKEN) {
      console.error("REPLICATE_API_TOKEN is not configured");
      return NextResponse.json(
        { error: "API configuration error. Please contact support." },
        { status: 500 }
      );
    }

    // Initialize Replicate client
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Extract prompt from request body
    const body = await request.json();
    const { prompt } = body;

    // Validate prompt
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    // Magic prompt modifier: Transform user input into high-end product art
    // Strategy: Create stunning glassmorphism product renders
    const enhancedPrompt = `A breathtaking, high-end 3D isometric conceptual render of a digital platform for: ${prompt}. 

The style is modern 'glassmorphism' featuring floating, translucent dark frosted glass panels and sleek 3D icons. Glowing neon cyan and sky-blue accents against a deep, dark slate background. 

Do not attempt to write legible text; instead, use elegant abstract data visualizations, glowing geometric nodes, smooth floating UI-like shapes, and beautiful 3D representations of the core features. 

Cinematic lighting with soft shadows and reflections. 8k resolution, product photography style, extremely polished and premium aesthetic.`;

    console.log("Generating sketch for prompt:", prompt);

    // Call Replicate API with FLUX 1.1 Pro (best quality)
    const output = await replicate.run(
      "black-forest-labs/flux-1.1-pro" as `${string}/${string}`,
      {
        input: {
          prompt: enhancedPrompt,
          aspect_ratio: "1:1",
          output_format: "webp",
          output_quality: 90,
          safety_tolerance: 2,
        },
      }
    );

    // Extract image URL from output
    let imageUrl: string | null = null;

    if (typeof output === "string") {
      imageUrl = output;
    } else if (Array.isArray(output) && output.length > 0) {
      imageUrl = output[0] as string;
    }

    if (!imageUrl) {
      throw new Error("No image URL returned from Replicate");
    }

    console.log("Sketch generated successfully:", imageUrl);

    // Return the image URL to the frontend
    return NextResponse.json({
      imageUrl,
      success: true,
    });
  } catch (error: unknown) {
    console.error("Error generating sketch:", error);

    // Handle errors
    return NextResponse.json(
      {
        error: "Failed to generate sketch. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Optional: Prevent caching for this API route
export const dynamic = "force-dynamic";
