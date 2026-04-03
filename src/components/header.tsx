"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { AskAIDialog } from "@/components/ask-ai-dialog"
import { Button } from "@/components/ui/button"
import { UserButton, Show, SignInButton, SignUpButton } from "@clerk/nextjs"
import { PanelLeft, FileText } from "lucide-react"

interface HeaderProps {
  onToggleSidebar?: () => void
  sidebarOpen?: boolean
}

export function Header({ onToggleSidebar, sidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="h-9 w-9 rounded-lg"
            >
              <PanelLeft className={`h-5 w-5 transition-transform duration-300 ${sidebarOpen ? "" : "rotate-180"}`} />
            </Button>
          )}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg shadow-primary/20">
              <FileText className="h-5 w-5" />
            </div>
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-xl font-bold text-transparent">
              CraftNotes
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <AskAIDialog />
          <div className="h-6 w-px bg-border/60" />
          <Show when="signed-in">
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </Show>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
