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

    // Extract key concepts to emphasize in the visual
    const promptLower = prompt.toLowerCase();
    let specificGuidance = "";

    // Add context-specific guidance based on keywords
    if (promptLower.includes("salesforce") || promptLower.includes("agentforce")) {
      specificGuidance = "\n- Show Salesforce-style UI cards with cloud icons and SF branding aesthetic";
    } else if (promptLower.includes("dashboard") || promptLower.includes("analytics")) {
      specificGuidance = "\n- Show charts, graphs, and data visualization widgets";
    } else if (promptLower.includes("crm") || promptLower.includes("customer")) {
      specificGuidance = "\n- Show contact lists, profile cards, and interaction timelines";
    } else if (promptLower.includes("ai") || promptLower.includes("chat") || promptLower.includes("agent")) {
      specificGuidance = "\n- Show chat interface, AI assistant bubbles, and conversation flows";
    }

    // Magic prompt modifier: Transform user input into UI mockup
    const enhancedPrompt = `A clean, modern web application UI mockup wireframe for: ${prompt}

Style: Minimal blueprint aesthetic with white and light blue lines on dark navy background. Show a realistic browser/app interface with:
- Top navigation bar with logo and menu items
- Main content area with 2-4 key feature sections/cards clearly representing the core functionality
- Sidebar with navigation or filters if appropriate
- Include SHORT, READABLE labels and headings so viewers understand what each section does
- Use geometric shapes, icons, and simple UI elements (buttons, cards, lists, forms)
- Make it look like a REAL APP INTERFACE a user would see and interact with, NOT abstract technical architecture${specificGuidance}
- Focus on the user-facing screens and experience`;

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
