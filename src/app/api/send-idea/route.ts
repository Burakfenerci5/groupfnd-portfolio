import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    // Check for API key first
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service configuration error. Please contact support." },
        { status: 500 }
      );
    }

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Extract data from request body
    const body = await request.json();
    const { email, prompt, imageUrl } = body;

    // Validate required fields
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "App idea prompt is required" },
        { status: 400 }
      );
    }

    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json(
        { error: "Generated sketch URL is required" },
        { status: 400 }
      );
    }

    console.log("Sending idea from:", email);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "FND Group <hello@groupfnd.com>",
      to: ["burakf@groupfnd.com"],
      subject: `New App Idea from ${email}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🚀 New Project Inquiry</h1>
  </div>
  
  <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef; border-top: none;">
    
    <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea;">
      <h2 style="margin-top: 0; color: #2d3748; font-size: 18px;">Prospect Details</h2>
      <p style="margin: 10px 0;">
        <strong style="color: #4a5568;">Email:</strong> 
        <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
      </p>
    </div>
    
    <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #48bb78;">
      <h2 style="margin-top: 0; color: #2d3748; font-size: 18px;">Their App Idea</h2>
      <p style="margin: 10px 0; color: #4a5568; white-space: pre-wrap;">${prompt}</p>
    </div>
    
    <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <h2 style="margin-top: 0; color: #2d3748; font-size: 18px;">Generated Architecture Sketch</h2>
      <div style="margin-top: 15px; text-align: center;">
        <img 
          src="${imageUrl}" 
          alt="Generated Architecture Sketch" 
          style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
        />
      </div>
      <p style="margin: 15px 0 0 0; font-size: 12px; color: #718096; text-align: center;">
        <a href="${imageUrl}" style="color: #667eea; text-decoration: none;">View full image →</a>
      </p>
    </div>
    
  </div>
  
  <div style="margin-top: 20px; padding: 20px; text-align: center; color: #718096; font-size: 12px;">
    <p style="margin: 5px 0;">This inquiry was generated from the Idea Sketcher on groupfnd.com</p>
    <p style="margin: 5px 0;">© 2026 FND Group</p>
  </div>
  
</body>
</html>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data?.id);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Sketch sent successfully!",
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);

    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Prevent caching for this API route
export const dynamic = "force-dynamic";
