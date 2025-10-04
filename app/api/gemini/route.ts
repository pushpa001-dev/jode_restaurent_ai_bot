import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { message, isFirstMessage } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ Missing Gemini API key");
      return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // --- CORE FACTS (persisted context — not for repeating every turn) ---
    const FACTS = `
[BRAND]
- Name: Jode_Restaurant
- Tagline: "Where Innovation Meets Taste"
- Highlights: Chef-crafted dishes, AI-powered ordering, premium desserts

[OPERATIONS]
- Hours: 11:00 AM – 11:00 PM (Mon–Sun)
- Location: City Center
- Services: Dine-in, takeaway, delivery

[MENU EXAMPLES]
- Starters: Cheesy Garlic Bread (veg), Crispy Chicken Wings (non-veg), Caesar Salad (veg)
- Main: Royal Butter Chicken (non-veg, rich), Spicy Veg Hakka Noodles (veg, 🌶), Jode Signature Pizza (veg)
- Desserts: Choco Lava Cake (sweet), Blueberry Cheesecake (sweet)
- Beverages: Mango Delight Smoothie (sweet), Jode Special Mocktail (refreshing)

[OFFERS POLICY]
- Mention seasonal deals when asked (no prices unless provided).
`;

    // --- BEHAVIOR & STYLE (anti-repetition + UX controls) ---
    const RULES = `
[ROLE]
You are the AI host of Jode_Restaurant. Warm, elegant, professional, concise.

[DO]
- Use the FACTS block for accurate info.
- Keep replies short unless the user asks for details.
- Tailor recommendations by veg/non-veg/spice/sweet preferences.
- For offers: mention seasonal deals on request.
- For reservations, ask for: Name, Party Size, Date, Time, Contact Number.
- Use light emojis 🍽️✨ and bullet lists when helpful.
- Ask at most one clarifying question when needed.

[DONT]
- Do NOT reintroduce the restaurant name/tagline unless this is the FIRST user message.
- Do NOT discuss code, implementation, or internal logic.
- Do NOT invent unavailable details (e.g., prices not given). If unknown, say so briefly.

[OUTPUT STYLE]
- Aim ≤ 80 words by default.
- Direct, contextual, no fluff.
`;

    const INTRO_POLICY = isFirstMessage
      ? "This IS the user's first message: greet warmly once. You may mention Jode_Restaurant and the tagline briefly."
      : "This is NOT the first message: reply directly with no restaurant introduction or tagline.";

    // Single composed prompt (keeps facts without causing repetition)
    const finalPrompt = `
${RULES}
${FACTS}

[CONTEXT CONTROL]
${INTRO_POLICY}

[USER MESSAGE]
${message}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: finalPrompt }] }] });

    const reply = result.response.text();
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Gemini API Error:", err);
    const errorMessage =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
