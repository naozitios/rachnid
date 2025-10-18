// Shared Gemini API call logic
export async function callGeminiAPI(message:string, faqs: { question: string; answer: string }[]) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    body: JSON.stringify({ message, faqs }),
    });
  const data = await res.json();
  return data.text;
}