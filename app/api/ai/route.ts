import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { type, prompt, image } = await request.json();
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Google AI API key not configured" },
        { status: 500 }
      );
    }

    let response;

    if (type === "text") {
      // Text generation using Gemini
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await geminiResponse.json();
      
      if (!geminiResponse.ok) {
        throw new Error(data.error?.message || "AI API request failed");
      }
      
      response = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";
      
      if (!response || response === "No response generated") {
        throw new Error("Failed to generate content. Please try again.");
      }
    } else if (type === "image" && image) {
      // Image analysis using Gemini Vision
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt || "Describe this image in detail" },
                  {
                    inline_data: {
                      mime_type: "image/jpeg",
                      data: image,
                    },
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await geminiResponse.json();
      
      if (!geminiResponse.ok) {
        throw new Error(data.error?.message || "AI API request failed");
      }
      
      response = data.candidates?.[0]?.content?.parts?.[0]?.text || "No description generated";
      
      if (!response || response === "No description generated") {
        throw new Error("Failed to analyze image. Please try again.");
      }
    } else {
      return NextResponse.json(
        { error: "Invalid request type" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, response });
  } catch (error: any) {
    console.error("AI API error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to process AI request",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

