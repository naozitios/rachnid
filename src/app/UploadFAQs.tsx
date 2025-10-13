import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function UploadFAQs() {
  return (
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
  );
}
