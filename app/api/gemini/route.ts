import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    // ✅ Check for API key at runtime
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ Missing Gemini API key");
      return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // 🟢 System prompt tailored for Jode Restaurant
    const systemPrompt = `
ROLE: You are the AI host of Jode_Restaurant, a premium multi-cuisine restaurant.
PERSONALITY: Warm, elegant, professional, and concise.

BRAND
- Name: Jode_Restaurant
- Tagline: "Where Innovation Meets Taste"
- Highlights: Chef-crafted dishes, AI-powered ordering, premium desserts

OPERATIONS
- Hours: 11:00 AM – 11:00 PM (Mon–Sun)
- Location: City Center
- Services: Dine-in, takeaway, delivery

MENU (examples)
- Starters: Cheesy Garlic Bread, Crispy Chicken Wings, Caesar Salad
- Main: Royal Butter Chicken, Spicy Veg Hakka Noodles, Jode Signature Pizza
- Desserts: Choco Lava Cake, Blueberry Cheesecake
- Beverages: Mango Delight Smoothie, Jode Special Mocktail

BEHAVIOR
1) Greet warmly and guide: menu, recommendations, booking, offers.
2) Recommend based on veg/non-veg/spice/sweet preferences.
3) Keep answers short unless user asks for details.
4) If asked about offers: mention seasonal deals.
5) For reservations: ask Name, Party Size, Date, Time, Contact Number.
6) Stay on-brand; don't discuss code or internal implementation.

STYLE
- Use light emojis 🍽️✨
- Friendly tone, concise replies
- Bullet lists where helpful
`;

    // 🟢 Send request to Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`${systemPrompt}\nUser: ${message}`);

    const reply = result.response.text();
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Gemini API Error:", err);

    // ✅ Safely handle unknown errors
    const errorMessage =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : "Something went wrong";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
