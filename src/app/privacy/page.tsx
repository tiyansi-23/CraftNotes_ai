"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenLine, ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-[#faf8f5] overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute w-[600px] h-[600px] bg-[#e6d5c3] rounded-full blur-3xl opacity-20 top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-[#d4e4d4] rounded-full blur-3xl opacity-15 bottom-[-100px] right-[-100px]" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 px-6 py-4 border-b border-[#e8e4df]/60"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#2d2a26] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <PenLine className="w-5 h-5 text-[#faf8f5]" />
            </div>
            <span className="text-xl font-bold text-[#2d2a26]">CraftNotes</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-[#6b6560] hover:text-[#2d2a26] hover:bg-[#f0ebe5]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full border border-[#e8e4df] mb-6">
            <Shield className="w-4 h-4 text-[#d4a574]" />
            <span className="text-sm text-[#6b6560]">Your data matters</span>
          </div>
          <h1 
            className="text-4xl md:text-5xl font-bold text-[#2d2a26] mb-4"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-[#6b6560]">Last updated: April 2025</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Section 1 */}
          <section className="bg-white/60 rounded-2xl p-8 border border-[#e8e4df]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#d4a574]/10 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#d4a574]" />
              </div>
              <h2 className="text-xl font-semibold text-[#2d2a26]">Data Security</h2>
            </div>
            <p className="text-[#6b6560] leading-relaxed">
              At CraftNotes, we take your data security seriously. All your notes are encrypted 
              and stored securely. We use industry-standard encryption protocols to ensure your 
              personal information and creative content remain private and protected.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/60 rounded-2xl p-8 border border-[#e8e4df]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#d4a574]/10 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#d4a574]" />
              </div>
              <h2 className="text-xl font-semibold text-[#2d2a26]">What We Collect</h2>
            </div>
            <p className="text-[#6b6560] leading-relaxed mb-4">
              We only collect information necessary to provide our services:
            </p>
            <ul className="space-y-2 text-[#6b6560]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full mt-2" />
                Account information (email, name) for authentication
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full mt-2" />
                Your notes and content you create
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full mt-2" />
                Usage analytics to improve our service
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white/60 rounded-2xl p-8 border border-[#e8e4df]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#d4a574]/10 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#d4a574]" />
              </div>
              <h2 className="text-xl font-semibold text-[#2d2a26]">Your Rights</h2>
            </div>
            <p className="text-[#6b6560] leading-relaxed">
              You have full control over your data. You can export, delete, or modify your notes 
              at any time. We do not sell your personal information to third parties. Your notes 
              belong to you, and only you control who can access them.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
