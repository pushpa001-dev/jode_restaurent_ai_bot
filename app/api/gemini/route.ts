import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });
    }

    // 🎯 Define a custom system instruction for Jode Restaurant
    const systemPrompt = `
      You are Jode AI Assistant 🤖 for **Jode Restaurant** 🍽️.
      Your job is to:
      - Greet customers warmly and politely.
      - Provide menu recommendations.
      - Suggest popular dishes, offers, and combo meals.
      - Answer questions about today's specials, opening hours, and services.
      - Speak in a friendly, conversational tone.
      - Keep responses short, clear, and helpful.
      - If asked something unrelated to food or restaurant, politely redirect back.

      Example style:
      - "Welcome to Jode Restaurant! 😋 Would you like to know today's specials?"
      - "Our best-selling dish is Butter Chicken with Garlic Naan 🥘🍞"
      - "We're open from 11 AM to 11 PM daily."
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Combine system instructions + user message
    const result = await model.generateContent(`${systemPrompt}\nUser: ${message}`);

    // ✅ Safest way to extract AI's reply
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
