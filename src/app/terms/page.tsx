"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenLine, ArrowLeft, Scale, CheckCircle, AlertCircle } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-[#faf8f5] overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute w-[600px] h-[600px] bg-[#d4e4d4] rounded-full blur-3xl opacity-20 top-[-200px] right-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-[#e6d5c3] rounded-full blur-3xl opacity-15 bottom-[-100px] left-[-100px]" />

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
            <Scale className="w-4 h-4 text-[#d4a574]" />
            <span className="text-sm text-[#6b6560]">Legal information</span>
          </div>
          <h1 
            className="text-4xl md:text-5xl font-bold text-[#2d2a26] mb-4"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Terms of Service
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
                <CheckCircle className="w-5 h-5 text-[#d4a574]" />
              </div>
              <h2 className="text-xl font-semibold text-[#2d2a26]">Acceptance of Terms</h2>
            </div>
            <p className="text-[#6b6560] leading-relaxed">
              By accessing or using CraftNotes, you agree to be bound by these Terms of Service. 
              If you disagree with any part of the terms, you may not access the service. 
              These terms apply to all users, including without limitation users who are browsers, 
              registered members, and contributors of content.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/60 rounded-2xl p-8 border border-[#e8e4df]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#d4a574]/10 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-[#d4a574]" />
              </div>
              <h2 className="text-xl font-semibold text-[#2d2a26]">Use of Service</h2>
            </div>
            <p className="text-[#6b6560] leading-relaxed mb-4">
              CraftNotes provides a note-taking and organization service. By using our service, you agree to:
            </p>
            <ul className="space-y-2 text-[#6b6560]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full mt-2" />
                Use the service only for lawful purposes and in accordance with these Terms
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full mt-2" />
                Not use the service in any way that could damage or impair the service
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full mt-2" />
                Not attempt to gain unauthorized access to any part of the service
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full mt-2" />
                Respect intellectual property rights of others
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white/60 rounded-2xl p-8 border border-[#e8e4df]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#d4a574]/10 rounded-xl flex items-center justify-center">
                <PenLine className="w-5 h-5 text-[#d4a574]" />
              </div>
              <h2 className="text-xl font-semibold text-[#2d2a26]">Your Content</h2>
            </div>
            <p className="text-[#6b6560] leading-relaxed">
              You retain all rights to the content you create on CraftNotes. By using our service, 
              you grant us a license to host, store, and display your content solely for the purpose 
              of providing the service to you. We claim no ownership over your notes or creative works. 
              You are free to export and delete your content at any time.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white/60 rounded-2xl p-8 border border-[#e8e4df]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#d4a574]/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#d4a574]" />
              </div>
              <h2 className="text-xl font-semibold text-[#2d2a26]">Account Termination</h2>
            </div>
            <p className="text-[#6b6560] leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach the Terms. 
              Upon termination, your right to use the service will immediately cease. 
              You may also delete your account at any time from your account settings.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
