"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Sidebar } from "@/components/sidebar"
import { NoteTextInput } from "@/components/note-text-input"
import { NoteProvider, useNote } from "@/components/providers/note-provider"
import { getNotesByUser } from "@/app/actions/notes"
import { Header } from "@/components/header"
import { PanelLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Note {
  id: string
  userId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

function DashboardContent({
  userId,
  initialNotes,
}: {
  userId: string
  initialNotes: Note[]
}) {
  const { isSaving, lastSavedAt, activeNoteId } = useNote()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Call auth check API to ensure user has at least one note
  useEffect(() => {
    const checkAuthAndCreateNote = async () => {
      try {
        const response = await fetch("/api/auth/check")
        if (response.ok) {
          const data = await response.json()
          if (data.noteId) {
            // Refresh notes to include the new welcome note
            const freshNotes = await getNotesByUser(userId)
            // The sidebar will handle selecting the first note
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error)
      }
    }
    checkAuthAndCreateNote()
  }, [userId])

  return (
    <div className="relative flex h-screen flex-col bg-[#faf8f5] overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e6d5c3]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4e4d4]/20 rounded-full blur-3xl" />
      </div>

      {/* Noise texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="relative flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="border-r border-[#e8e4df]/60 bg-[#faf8f5]/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="h-full w-80">
                <Sidebar userId={userId} initialNotes={initialNotes} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar Toggle Button (when closed) */}
        <AnimatePresence>
          {!sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 top-4 z-10"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="h-9 w-9 bg-white/60 hover:bg-[#f0ebe5] border border-[#e8e4df] shadow-sm"
              >
                <PanelLeft className="h-4 w-4 text-[#6b6560]" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Editor Area */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Floating Status Indicator */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#e8e4df]/40">
            <div className="flex items-center gap-3">
              {activeNoteId ? (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-sm px-3 py-1.5 text-xs border border-[#e8e4df]"
                >
                  <motion.div 
                    className={`h-2 w-2 rounded-full ${isSaving ? "bg-[#d4a574]" : "bg-[#6b9b7a]"}`}
                    animate={isSaving ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                  <span className="text-[#6b6560]">
                    {isSaving ? "Saving..." : lastSavedAt ? `Saved at ${lastSavedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Ready"}
                  </span>
                </motion.div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-[#8b8680]">
                  <Sparkles className="w-3 h-3" />
                  <span>Select a note to start editing</span>
                </div>
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden p-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto h-full max-w-4xl"
            >
              <div className="h-full rounded-2xl bg-white/60 backdrop-blur-sm p-8 shadow-sm border border-[#e8e4df]/60">
                <NoteTextInput />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Dashboard({
  userId,
  initialNotes,
}: {
  userId: string
  initialNotes: Note[]
}) {
  return (
    <NoteProvider>
      <DashboardContent userId={userId} initialNotes={initialNotes} />
    </NoteProvider>
  )
}
