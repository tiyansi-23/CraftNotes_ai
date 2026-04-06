"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { AskAIDialog } from "@/components/ask-ai-dialog"
import { Button } from "@/components/ui/button"
import { UserButton, Show, SignInButton, SignUpButton } from "@clerk/nextjs"
import { PanelLeft, PenLine } from "lucide-react"

interface HeaderProps {
  onToggleSidebar?: () => void
  sidebarOpen?: boolean
}

export function Header({ onToggleSidebar, sidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e8e4df]/60 bg-[#faf8f5]/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="h-9 w-9 rounded-lg bg-white/60 hover:bg-[#f0ebe5] border border-[#e8e4df]/60"
            >
              <PanelLeft className={`h-5 w-5 text-[#6b6560] transition-transform duration-300 ${sidebarOpen ? "" : "rotate-180"}`} />
            </Button>
          )}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 12 }}
              transition={{ duration: 0.3 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2d2a26] text-[#faf8f5] shadow-lg shadow-[#2d2a26]/20"
            >
              <PenLine className="h-5 w-5" />
            </motion.div>
            <span className="text-xl font-bold text-[#2d2a26]">
              CraftNotes
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <AskAIDialog />
          <div className="h-6 w-px bg-[#e8e4df]" />
          <Show when="signed-in">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-xl",
                }
              }}
            />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="text-[#6b6560] hover:text-[#2d2a26] hover:bg-[#f0ebe5]">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm" className="bg-[#2d2a26] text-[#faf8f5] hover:bg-[#1a1815]">
                Sign Up
              </Button>
            </SignUpButton>
          </Show>
        </div>
      </div>
    </header>
  )
}
