import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    // Check for API key first
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      return NextResponse.json(
        { error: "API configuration error. Please contact support." },
        { status: 500 }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
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

    // Magic prompt modifier: Transform user input into technical sketch prompt
    const enhancedPrompt = `A minimalist, high-tech architectural napkin sketch, blueprint style, white and light blue neon lines on a dark navy background. Technical wireframe concept for a software application based on this idea: ${prompt}. Do not include legible text, just conceptual UI/UX and architectural nodes.`;

    console.log("Generating sketch for prompt:", prompt);

    // Call OpenAI DALL-E 3 API
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    });

    // Extract image URL
    const imageUrl = response.data?.[0]?.url;

    if (!imageUrl) {
      throw new Error("No image URL returned from OpenAI");
    }

    console.log("Sketch generated successfully:", imageUrl);

    // Return the image URL to the frontend
    return NextResponse.json({
      imageUrl,
      success: true,
    });
  } catch (error: unknown) {
    console.error("Error generating sketch:", error);

    // Handle OpenAI-specific errors
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        {
          error: "Failed to generate sketch. Please try again.",
          details: error.message,
        },
        { status: error.status || 500 }
      );
    }

    // Handle generic errors
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Optional: Prevent caching for this API route
export const dynamic = "force-dynamic";
