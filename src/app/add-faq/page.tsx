"use client";

import { useState } from "react";
import { useUserUuid } from "@/context/UserUuidContext";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"


export default function AddFAQPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { userUuid, faqs, loadFaq } = useUserUuid();
  const [isLoading, setIsLoading] = useState(false);

    async function handleAddFAQ(e: React.FormEvent) {
    setIsLoading(true)
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    const res = await fetch("/api/qna", {
      method: "POST",
      body: JSON.stringify({ action: "add", _id: userUuid, question: question, answer: answer }),
    });
    
    const data = await res.json();
    if (!data.success) {
      console.error("Failed to add FAQ:", data.message);
    }
    toast("New FAQ added! You can view it in the FAQ List.", {
      action: {
        label: "Close",
        onClick: () => toast.dismiss(),
      },
      classNames: {
        description: "text-blue-400",
      },
    })
    setQuestion("");
    setAnswer("");
    setIsLoading(false)
    loadFaq();
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Add a New FAQ</CardTitle>
              <CardDescription>
                Fill out the form below to add a new frequently asked question.<br />
                (Only 10 questions can be added for this version)              
                </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddFAQ} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    placeholder="Enter the question"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="answer">Answer</Label>
                  <Textarea
                    id="answer"
                    placeholder="Enter the answer"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={!question.trim() || !answer.trim() || faqs.length >= 10 || isLoading}>
                  {isLoading && <Spinner />}
                  Add FAQ
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}