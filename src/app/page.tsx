"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserUuid } from "@/context/UserUuidContext"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Chatbot } from "./pages/Chatbot"
import { FAQList } from "./pages/FAQList"

export default function Page() {
  const [view, setView] = useState("chatbot")
  const { userUuid } = useUserUuid()
  const router = useRouter()

  useEffect(() => {
    if (!userUuid) {
      router.push("/login")
    }
  }, [userUuid, router])

  if (!userUuid) {
    return null; 
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex gap-2 mb-4">
            <Button onClick={() => setView("chatbot")} variant={view === "chatbot" ? "default" : "outline"}>
              Chatbot
            </Button>
            <Button onClick={() => setView("upload")} variant={view === "upload" ? "default" : "outline"}>
              FAQ List
            </Button>
          </div>
          {view === "chatbot" ? <Chatbot /> : <FAQList />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
