"use client"

import { motion } from "motion/react"
import { PenLine } from "lucide-react"

export default function RootLoading() {
  return (
    <div className="fixed inset-0 bg-[#faf8f5] flex items-center justify-center z-50">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e6d5c3]/20 rounded-full blur-3xl" />
      </div>

      {/* Loading Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center gap-6"
      >
        {/* Logo Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-[#2d2a26] rounded-2xl flex items-center justify-center shadow-xl"
        >
          <PenLine className="w-8 h-8 text-[#faf8f5]" />
        </motion.div>

        {/* Text */}
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-[#2d2a26] mb-1"
          >
            CraftNotes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-[#6b6560]"
          >
            Loading your creative space...
          </motion.p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#d4a574] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
