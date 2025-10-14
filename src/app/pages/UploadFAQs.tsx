"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserUuid } from "@/context/UserUuidContext";

export function UploadFAQs() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { userUuid, faqs, setFaqs } = useUserUuid();

  async function handleAddFAQ(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    setFaqs([...faqs, { question, answer }]);

    const res = await fetch("/api/qna", {
      method: "POST",
      body: JSON.stringify({ action: "add", _id: userUuid, question: question, answer: answer }),
    });
    
    const data = await res.json();
    if (!data.success) {
      console.error("Failed to add FAQ:", data.message);
      setFaqs(faqs);
    }
    setQuestion("");
    setAnswer("");
  }

  async function handleDeleteFAQ(idx: number) {
    const res = await fetch("/api/qna", {
      method: "POST",
      body: JSON.stringify({ action: "remove", _id: userUuid, question: faqs[idx].question }),
    });
    const data = await res.json();
    if (!data.success) {
      console.error("Failed to remove FAQ:", data.message);
    }
    setFaqs(faqs.filter((_, i) => i !== idx));
  }

  return (
    <Card className="flex flex-col flex-1 h-full">
      <CardHeader>
        <CardTitle>Upload FAQs</CardTitle>
        <CardDescription>
          Add a question and answer below. Existing FAQs are listed below and can be deleted.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleAddFAQ} className="space-y-2">
          <Input
            placeholder="Question"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
          <Input
            placeholder="Answer"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
          <Button type="submit" disabled={!question.trim() || !answer.trim()}>
            Add FAQ
          </Button>
        </form>
        <div className="space-y-2">
          {faqs.length > 0 && <div className="font-semibold">Existing FAQs:</div>}
          {faqs.map((faq, idx) => (
            <div key={idx} className="flex items-center justify-between border rounded p-2">
              <div>
                <div className="font-medium">Q: {faq.question}</div>
                <div className="text-sm text-muted-foreground">A: {faq.answer}</div>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteFAQ(idx)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
