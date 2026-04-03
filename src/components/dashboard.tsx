"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { NoteTextInput } from "@/components/note-text-input"
import { NoteProvider, useNote } from "@/components/providers/note-provider"
import { getNotesByUser } from "@/app/actions/notes"
import { Header } from "@/components/header"

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
    <div className="flex h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`border-r border-border/40 bg-muted/20 backdrop-blur-sm transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-80 translate-x-0" : "w-0 -translate-x-full opacity-0"
          }`}
        >
          <div className="h-full w-80">
            <Sidebar userId={userId} initialNotes={initialNotes} />
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex flex-1 flex-col bg-background/50">
          {/* Floating Status Indicator */}
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-3">
              {activeNoteId && (
                <div className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
                  <div className={`h-2 w-2 rounded-full ${isSaving ? "animate-pulse bg-amber-500" : "bg-emerald-500"}`} />
                  <span>
                    {isSaving ? "Saving..." : lastSavedAt ? `Saved at ${lastSavedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Ready"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden px-8 pb-8">
            <div className="mx-auto h-full max-w-4xl rounded-2xl bg-card/50 p-8 shadow-sm ring-1 ring-border/20">
              <NoteTextInput />
            </div>
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
