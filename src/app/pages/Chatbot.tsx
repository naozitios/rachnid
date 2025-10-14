"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { callGeminiAPI } from "../../lib/gemini";
import { useUserUuid } from "@/context/UserUuidContext";

export function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const { faqs } = useUserUuid();

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prevMsgs) => [...prevMsgs, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const geminiText = await callGeminiAPI(input, faqs);
      setMessages((prevMsgs) => [...prevMsgs, { role: "assistant", text: geminiText }]);
    } catch (err) {
      setMessages((prevMsgs) => [...prevMsgs, { role: "assistant", text: "Error contacting Gemini API." }]);
      console.error("Gemini API error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="flex flex-col flex-1 h-full">
      <CardHeader>
        <CardTitle>Chatbot</CardTitle>
        <CardDescription>
          Chat with the AI assistant.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "text-right" : "text-left text-blue-600"}>
              <span className="font-semibold">{msg.role === "user" ? "You" : "Gemini"}:</span> {msg.text}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !loading) sendMessage(); }}
          disabled={loading}
        />
        <Button onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </CardFooter>
    </Card>
  );
}
