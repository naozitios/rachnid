import { NextRequest, NextResponse } from "next/server";
import { addQuestionAnswer, removeQuestion, viewAllQuestionsAndAnswers } from "@/lib/dbCommands";

export async function POST(req: NextRequest) {
  const { action, _id, question, answer } = await req.json();
  if (action === "add") {
    const result = await addQuestionAnswer(_id, question, answer);
    return NextResponse.json({ success: !!result });
  }

  if (action === "remove") {
    const result = await removeQuestion(_id, question);
    return NextResponse.json({ success: !!result });
  }

  if (action === "view") {
    const result = await viewAllQuestionsAndAnswers(_id);
    return NextResponse.json({ qna: result });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
