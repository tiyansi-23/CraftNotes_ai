"use client"

import { motion } from "motion/react"
import { SignUp } from "@clerk/nextjs"
import { PenLine, ArrowLeft, Sparkles, Gift } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen bg-[#faf8f5] overflow-hidden">
      {/* Background gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-[#d4e4d4] rounded-full blur-3xl opacity-40 top-[-150px] right-[-150px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-[#f0d4d4] rounded-full blur-3xl opacity-30 bottom-[-100px] left-[-100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Back to home link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-8 left-8 z-20"
      >
        <Link 
          href="/" 
          className="flex items-center gap-2 text-[#6b6560] hover:text-[#2d2a26] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to home</span>
        </Link>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#2d2a26] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <PenLine className="w-5 h-5 text-[#faf8f5]" />
          </div>
          <span className="text-xl font-bold text-[#2d2a26]">CraftNotes</span>
        </Link>
      </motion.div>

      {/* Main content */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#e8e4df] mb-6"
            >
              <Gift className="w-4 h-4 text-[#d4a574]" />
              <span className="text-sm text-[#6b6560]">Free forever</span>
            </motion.div>
            <h1 
              className="text-3xl font-bold text-[#2d2a26] mb-2"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Create your account
            </h1>
            <p className="text-[#6b6560]">
              Start capturing your ideas today
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4e4d4]/20 to-[#f0d4d4]/20 rounded-2xl blur-xl" />
            <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-[#e8e4df] p-1 shadow-xl">
              <SignUp 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none",
                    header: "hidden",
                    socialButtonsBlockButton: "bg-[#faf8f5] hover:bg-[#f0ebe5] border-[#e8e4df] text-[#2d2a26]",
                    formFieldLabel: "text-[#2d2a26]",
                    formFieldInput: "bg-[#faf8f5] border-[#e8e4df] text-[#2d2a26] placeholder:text-[#a8a29e] focus:border-[#d4a574]",
                    formButtonPrimary: "bg-[#2d2a26] hover:bg-[#1a1815] text-[#faf8f5]",
                    footerActionLink: "text-[#d4a574] hover:text-[#b8925f]",
                    identityPreview: "bg-[#faf8f5] border-[#e8e4df]",
                  }
                }}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mt-8 text-sm text-[#6b6560]"
          >
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#d4a574] hover:text-[#b8925f] transition-colors font-medium">
              Sign in
            </Link>
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 grid grid-cols-3 gap-4 text-center"
          >
            <div className="p-3">
              <Sparkles className="w-5 h-5 mx-auto mb-2 text-[#d4a574]" />
              <p className="text-xs text-[#6b6560]">AI-powered</p>
            </div>
            <div className="p-3">
              <svg className="w-5 h-5 mx-auto mb-2 text-[#d4a574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs text-[#6b6560]">Secure</p>
            </div>
            <div className="p-3">
              <svg className="w-5 h-5 mx-auto mb-2 text-[#d4a574]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-xs text-[#6b6560]">Fast</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
