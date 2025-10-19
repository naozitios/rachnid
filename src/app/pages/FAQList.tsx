"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUserUuid } from "@/context/UserUuidContext";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function FAQList() {
  const { userUuid, faqs, setFaqs, loadFaq } = useUserUuid();

  async function handleDeleteFAQ(idx: number) {
    const originalFaqs = [...faqs];
    const updatedFaqs = faqs.filter((_, i) => i !== idx);
    setFaqs(updatedFaqs);

    const res = await fetch("/api/qna", {
      method: "POST",
      body: JSON.stringify({ action: "remove", _id: userUuid, question: faqs[idx].question }),
    });
    const data = await res.json();
    if (!data.success) {
      console.error("Failed to remove FAQ:", data.message);
      setFaqs(originalFaqs);
    }
    loadFaq();
  }

  return (
    <Table>
      <TableCaption>A list of your FAQs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[35%]">Question</TableHead>
          <TableHead className="w-[65%]">Answer</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
        <TableBody>
          {faqs.length > 0 ? (
            faqs.map((faq, idx) => (
              <TableRow key={idx}>
                <TableCell className="align-top font-medium break-words whitespace-normal">
                  {faq.question}
                </TableCell>
                <TableCell className="align-top text-muted-foreground break-words whitespace-normal">
                  {faq.answer}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText([faq.question, ':' ,faq.answer].join("\n"))}
                      >
                        🗒️ Copy question and answer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeleteFAQ(idx)}>🗑️ Delete question</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                No FAQs yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>


      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total questions</TableCell>
          <TableCell className="text-right">{faqs.length}</TableCell>
        </TableRow>
      </TableFooter>

    </Table>
  )
}
