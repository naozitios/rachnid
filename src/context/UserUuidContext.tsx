"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserUuidContextType {
  userUuid: string | null;
  setUserUuid: (uuid: string | null) => void;
  faqs: { question: string; answer: string }[];
  setFaqs: (faqs: { question: string; answer: string }[]) => void;
  username: string;
  setUsername: (username: string) => void;
  clearSession: () => void; 
  loadFaq: () => Promise<void>;
}

const UserUuidContext = createContext<UserUuidContextType | undefined>(undefined);

export function UserUuidProvider({ children }: { children: ReactNode }) {
  const [userUuid, setUserUuid] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [username, setUsername] = useState<string>('Guest');

  function clearSession() {
    setUserUuid(null);
    setFaqs([]);
    setUsername("Guest");
    sessionStorage.removeItem("userUuid"); // remove persisted value
  }

  async function loadFaq() {
  if (!userUuid) return;
  try {
    const res = await fetch("/api/qna", {
      method: "POST",
      body: JSON.stringify({ action: "view", _id: userUuid }),
    });
    const data = await res.json();
    if (data.qna) {
      setFaqs(data.qna);
    }
  } catch (error) {
    console.error("Failed to load QnA:", error);
  }
}

  // ✅ Load from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("userUuid");
    if (stored) setUserUuid(stored);
  }, []);

  // ✅ Save to sessionStorage when it changes
  useEffect(() => {
    if (userUuid) {
      sessionStorage.setItem("userUuid", userUuid);
    }
  }, [userUuid]);

  useEffect(() => {
    loadFaq();
  }, [userUuid, loadFaq]);

  return (
    <UserUuidContext.Provider value={{ userUuid, setUserUuid, faqs, setFaqs, username, setUsername, clearSession, loadFaq }}>
      {children}
    </UserUuidContext.Provider>
  );
}

export function useUserUuid() {
  const context = useContext(UserUuidContext);
  if (!context) throw new Error("useUserUuid must be used within a UserUuidProvider");
  return context;
}
