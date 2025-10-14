"use client";

import { useState } from "react";
import { useUserUuid } from "@/context/UserUuidContext";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [uuid, setUuid] = useState("");
  const [password, setPassword] = useState("");
  const [uuidResult, setUuidResult] = useState<string|null>(null);
  const [passwordResult, setPasswordResult] = useState<string|null>(null);
  const { setUserUuid } = useUserUuid();
  const [uuidLoginMode, setUuidLoginMode] = useState(true);
  const router = useRouter();

  async function handleUsernameCheck(e: React.FormEvent) {
    e.preventDefault();
    setUuidResult(null);

    if (!uuid) {
      setUuidResult("No UUID entered.");
      return;
    }

    try {
      const username = uuid;
      const res = await fetch("/api/check-username", {
        method: "POST",
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (data.exists) {
        setUserUuid(data.exists);
        router.push('/tabs');
      } else {
        setUuidResult(`UUID ${uuid} not found.`);
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setUuidResult('An error occurred while checking the UUID.');
    }
  }

  function handlePasswordCheck(e: React.FormEvent) {
    e.preventDefault();
    // Replace with actual check logic
    if (password === "correct-password") {
      router.push("/tabs");
    } else {
      setPasswordResult(password ? `Password for ${password} not found.` : "No password entered.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
      <div className="w-full flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          <Switch checked={uuidLoginMode} onCheckedChange={setUuidLoginMode} />
          <Label >Hello Sir, do you have a gifted username?</Label>
        </div>
      </div>
      {
        uuidLoginMode ? (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check username</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUsernameCheck} className="space-y-4">
            <Input
              placeholder="Enter UUID"
              value={uuid}
              onChange={e => setUuid(e.target.value)}
            />
            <Button type="submit">Check UUID</Button>
            {uuidResult && <div className="text-muted-foreground mt-2">{uuidResult}</div>}
          </form>
        </CardContent>
      </Card>
        ) : (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordCheck} className="space-y-4">
            <Input
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit">Check Password</Button>
            {passwordResult && <div className="text-muted-foreground mt-2">{passwordResult}</div>}
          </form>
        </CardContent>
      </Card>
        )
      }
    </div>
  );
}