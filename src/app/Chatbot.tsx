import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Chatbot() {
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
          {/* Chat messages will go here */}
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Input placeholder="Type your message..." />
        <Button>Send</Button>
      </CardFooter>
    </Card>
  );
}
