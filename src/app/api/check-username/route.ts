import { checkUsername } from "@/lib/dbCommands";

export async function POST(req: Request) {
  const { username } = await req.json();
  const exists = await checkUsername(username);
  return Response.json({ exists });
}
