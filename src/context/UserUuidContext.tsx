"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserUuidContextType {
  userUuid: string | null;
  setUserUuid: (uuid: string | null) => void;
  faqs: { question: string; answer: string }[];
  setFaqs: (faqs: { question: string; answer: string }[]) => void;
}

const UserUuidContext = createContext<UserUuidContextType | undefined>(undefined);

export function UserUuidProvider({ children }: { children: ReactNode }) {
  const [userUuid, setUserUuid] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);

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
  };

  useEffect(() => {
    loadFaq();
  }, [userUuid]);
  
  return (
    <UserUuidContext.Provider value={{ userUuid, setUserUuid, faqs, setFaqs }}>
      {children}
    </UserUuidContext.Provider>
  );
}

export function useUserUuid() {
  const context = useContext(UserUuidContext);
  if (!context) throw new Error("useUserUuid must be used within a UserUuidProvider");
  return context;
}
