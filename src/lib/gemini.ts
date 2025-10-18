// Shared Gemini API call logic
import { GoogleGenAI } from "@google/genai";

export async function callGeminiAPI(message:string, faqs: { question: string; answer: string }[]) {
  const apiUrl = process.env.GEMINI_API_KEY;
  console.log(apiUrl)
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set");
  }

  const queryMessage = 
    "Only answer the query with the FAQs. If the answer isnt in the FAQs say - 'I dont have the information to support that' Question:" 
    + message + "\n\nHere are some FAQs that might help:\n" + faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n");

  const ai = new GoogleGenAI({ apiKey: apiUrl });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: queryMessage,
  });
  const text = response.text;
  if (!response) {
    throw new Error('Gemini API error: ' + response+ ' ' + text);
  }
  return text ?? '';
}