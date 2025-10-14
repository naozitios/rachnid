import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Chatbot } from "../pages/Chatbot";
import { UploadFAQs } from "../pages/UploadFAQs";

export default function TabsPage() {
  return (
    <main className="flex flex-col items-center p-0 mt-10 px-10">
      <Tabs defaultValue="chatbot" className="w-full max-w-4xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
          <TabsTrigger value="upload">Upload FAQs</TabsTrigger>
        </TabsList>
        <TabsContent value="chatbot" className="h-full flex flex-col">
          <Chatbot />
        </TabsContent>
        <TabsContent value="upload" className="h-full flex flex-col">
          <UploadFAQs />
        </TabsContent>
      </Tabs>
    </main>
  );
}
