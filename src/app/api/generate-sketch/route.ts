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

    // The Prompt Engineering: Wrap user's idea in high-end UI design context
    const finalPrompt = `A breathtaking, high-end UI/UX design concept for: ${prompt}. Dark mode, sleek modern web application interface, glowing neon blue and purple accents, glassmorphism panels, perfectly aligned grid layout, professional Dribbble and Behance style, 8k resolution, highly detailed, masterpiece.`;

    console.log("Generating sketch for prompt:", prompt);

    // Call Replicate API with FLUX 1.1 Pro (excellent for UI and text)
    const output = await replicate.run(
      "black-forest-labs/flux-1.1-pro" as `${string}/${string}`,
      {
        input: {
          prompt: finalPrompt,
          aspect_ratio: "16:9", // Better for web app layouts
          output_format: "jpg",
          safety_tolerance: 5,
        },
      }
    );

    // Parse Replicate output (can be string or array)
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

    // Return the image URL in the expected format
    return NextResponse.json({
      url: imageUrl,
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

// Prevent caching for this API route
export const dynamic = "force-dynamic";
