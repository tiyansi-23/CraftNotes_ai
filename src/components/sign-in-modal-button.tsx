"use client"

import { SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function SignInModalButton() {
  return (
    <SignInButton mode="modal">
      <Button 
        size="lg" 
        className="bg-[#2d2a26] text-[#faf8f5] hover:bg-[#1a1815] rounded-full px-8 py-6 text-lg group"
      >
        Sign In to Continue
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </SignInButton>
  )
}
