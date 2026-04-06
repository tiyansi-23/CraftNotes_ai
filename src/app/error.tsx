"use client"

import { useEffect } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenLine, RefreshCcw, AlertTriangle, Home } from "lucide-react"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="relative min-h-screen bg-[#faf8f5] overflow-hidden">
      {/* Background gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-[#f0d4d4] rounded-full blur-3xl opacity-30 top-[-200px] right-[-200px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] bg-[#e6d5c3] rounded-full blur-3xl opacity-20 bottom-[-100px] left-[-100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#2d2a26] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <PenLine className="w-5 h-5 text-[#faf8f5]" />
            </div>
            <span className="text-xl font-bold text-[#2d2a26]">CraftNotes</span>
          </Link>
        </div>
      </motion.nav>

      {/* Main content */}
      <div className="relative z-20 flex min-h-[80vh] items-center justify-center px-4">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 150 }}
              className="relative inline-block mb-8"
            >
              <div className="w-32 h-32 bg-white rounded-3xl shadow-xl border border-[#e8e4df] flex items-center justify-center">
                <AlertTriangle className="w-16 h-16 text-red-400" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-2 -right-2 w-12 h-12 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-red-500 font-bold text-lg">!</span>
              </motion.div>
            </motion.div>

            <h1 
              className="text-5xl md:text-6xl font-bold text-[#2d2a26] mb-4"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Something went wrong
            </h1>

            <p className="text-lg text-[#6b6560] mb-4 max-w-md mx-auto leading-relaxed">
              We encountered an unexpected error. Our team has been notified and we&apos;re working to fix it.
            </p>

            {error.message && (
              <div className="mb-8 p-4 bg-white/60 rounded-xl border border-[#e8e4df] max-w-lg mx-auto">
                <p className="text-sm text-[#8b8680] font-mono">{error.message}</p>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                onClick={reset}
                size="lg" 
                className="bg-[#2d2a26] text-[#faf8f5] hover:bg-[#1a1815] rounded-full px-8 py-6 text-lg group"
              >
                <RefreshCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </Button>
              <Link href="/">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#2d2a26] text-[#2d2a26] hover:bg-[#f0ebe5] rounded-full px-8 py-6 text-lg"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
