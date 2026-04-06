"use client"

import { motion } from "motion/react"
import { PenLine } from "lucide-react"

export default function DashboardLoading() {
  return (
    <div className="relative min-h-screen bg-[#faf8f5] overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e6d5c3]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4e4d4]/10 rounded-full blur-3xl" />
      </div>

      {/* Loading Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[#e8e4df]/60 bg-[#faf8f5]/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 rounded-lg bg-[#2d2a26]/20 animate-pulse" />
            <div className="h-6 w-32 bg-[#2d2a26]/20 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-20 bg-[#d4a574]/20 rounded-full animate-pulse" />
            <div className="h-8 w-8 bg-[#2d2a26]/20 rounded-xl animate-pulse" />
          </div>
        </div>
      </header>

      {/* Loading Content */}
      <div className="relative flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Loading Sidebar */}
        <div className="w-80 border-r border-[#e8e4df]/60 bg-[#faf8f5]/50 p-5">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 bg-[#2d2a26]/20 rounded-xl animate-pulse" />
            <div className="h-5 w-20 bg-[#2d2a26]/20 rounded animate-pulse" />
          </div>
          <div className="h-10 bg-white/60 rounded-xl mb-4 animate-pulse" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-white/40 rounded-xl animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
        </div>

        {/* Loading Editor */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mx-auto h-full max-w-4xl w-full">
            <div className="h-full rounded-2xl bg-white/40 p-8 shadow-sm border border-[#e8e4df]/40">
              <div className="h-4 w-24 bg-[#2d2a26]/10 rounded mb-8 animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 bg-[#2d2a26]/10 rounded animate-pulse w-full" />
                <div className="h-4 bg-[#2d2a26]/10 rounded animate-pulse w-[95%]" />
                <div className="h-4 bg-[#2d2a26]/10 rounded animate-pulse w-[90%]" />
                <div className="h-4 bg-[#2d2a26]/10 rounded animate-pulse w-[85%]" />
                <div className="h-4 bg-[#2d2a26]/10 rounded animate-pulse w-full" />
                <div className="h-4 bg-[#2d2a26]/10 rounded animate-pulse w-[80%]" />
                <div className="h-4 bg-[#2d2a26]/10 rounded animate-pulse w-[92%]" />
                <div className="h-4 bg-[#2d2a26]/10 rounded animate-pulse w-[88%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Loading Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-[#e8e4df]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 rounded-xl bg-[#2d2a26] flex items-center justify-center"
          >
            <PenLine className="w-6 h-6 text-[#faf8f5]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
