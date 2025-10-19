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
        `You are answering as an expert based on the following FAQs. Use the FAQs to answer the user's question. 
        Add a friendly tone only if the question can be answered. 
        If the answer is not in the FAQs, respond: 'Sorry, I don't have the information to support that.' Question: \n` +
        message +
        "\nFAQs:\n" +
        faqs.map((f:{ question: string; answer: string }) => `Q: ${f.question}\nA: ${f.answer}`).join("\n"),
    });

    return NextResponse.json({ text: response.text });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
