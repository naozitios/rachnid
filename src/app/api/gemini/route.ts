// src/app/api/gemini/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, faqs } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not set" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:
        "Only answer the query with the FAQs. If answers in the FAQ can be used to solve the users question use them. Add a friendly tone to your answers only if the question can be answered. If the answer isn't in the FAQs say 'Sorry about that but I don't have the information to support that'. Question: " +
        message +
        "\n\nFAQs:\n" +
        faqs.map((f:{ question: string; answer: string }) => `Q: ${f.question}\nA: ${f.answer}`).join("\n"),
    });

    return NextResponse.json({ text: response.text });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
