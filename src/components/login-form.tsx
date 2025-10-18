'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserUuid } from '@/context/UserUuidContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [usernameInput, setUsernameInput] = useState('');
  const [uuidResult, setUuidResult] = useState<string | null>(null);
  const { setUserUuid, setUsername } = useUserUuid();
  const router = useRouter();

  async function handleUsernameCheck(e: React.FormEvent) {
    e.preventDefault();
    setUuidResult(null);

    if (!usernameInput) {
      setUuidResult('No UUID entered.');
      return;
    }

    try {
      const trimmedUsername = usernameInput.trim();
      const res = await fetch('/api/check-username', {
        method: 'POST',
        body: JSON.stringify({ username: trimmedUsername }),
      });
      const data = await res.json();
      if (data.exists) {
        setUserUuid(data.exists);
        setUsername(usernameInput);
        router.push('/');
      } else {
        setUuidResult(`UUID ${usernameInput} not found.`);
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setUuidResult('An error occurred while checking the UUID.');
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            Login with your given credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUsernameCheck}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="username"
                  placeholder="theChatBotUser"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                {uuidResult && <p className="text-red-500 text-center text-sm mt-2">{uuidResult}</p>}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? Contact Noah
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}