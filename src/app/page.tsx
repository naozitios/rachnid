import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-0 m-0">
      <Tabs defaultValue="chatbot" className="flex flex-col flex-1 w-full h-full min-h-screen">
      <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
          <TabsTrigger value="upload">Upload FAQs</TabsTrigger>
        </TabsList>
        <TabsContent value="chatbot" className="h-full flex flex-col">
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
        </TabsContent>
        <TabsContent value="upload" className="h-full flex flex-col">
          <Card className="flex flex-col flex-1 h-full">
            <CardHeader>
              <CardTitle>Upload FAQs</CardTitle>
              <CardDescription>
                Upload a file with your FAQs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea placeholder="Paste your FAQs here." />
            </CardContent>
            <CardFooter>
              <Button>Upload</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}