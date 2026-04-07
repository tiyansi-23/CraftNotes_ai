"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { useNote } from "@/components/providers/note-provider"
import { updateNoteContent } from "@/app/actions/notes"
import { PenLine, FileText, Sparkles } from "lucide-react"

const SAVE_DEBOUNCE_MS = 1000

export function NoteTextInput() {
  const {
    activeNoteId,
    activeNoteContent,
    setActiveNoteContent,
    setIsSaving,
    setLastSavedAt,
  } = useNote()

  const [localContent, setLocalContent] = useState(activeNoteContent)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastSavedContentRef = useRef(activeNoteContent)

  // Sync local content when active note changes
  useEffect(() => {
    // Save any pending changes before switching
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = null
      // Trigger immediate save if there's unsaved content
      const pendingContent = localContent
      const currentNoteId = activeNoteId
      if (currentNoteId && pendingContent !== lastSavedContentRef.current) {
        performSave(pendingContent, currentNoteId)
      }
    }
    
    setLocalContent(activeNoteContent)
    lastSavedContentRef.current = activeNoteContent
  }, [activeNoteId, activeNoteContent])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  const performSave = useCallback(
    async (content: string, noteId: string) => {
      if (!noteId || content === lastSavedContentRef.current) {
        return
      }

      setIsSaving(true)
      try {
        await updateNoteContent(noteId, content)
        lastSavedContentRef.current = content
        setLastSavedAt(new Date())
      } catch (error) {
        console.error("Failed to save note:", error)
      } finally {
        setIsSaving(false)
      }
    },
    [setIsSaving, setLastSavedAt]
  )

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setLocalContent(newContent)
    setActiveNoteContent(newContent)

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    // Capture current note ID to ensure we save to the correct note
    const currentNoteId = activeNoteId

    // Set new timeout for debounced save
    saveTimeoutRef.current = setTimeout(() => {
      if (currentNoteId) {
        performSave(newContent, currentNoteId)
      }
    }, SAVE_DEBOUNCE_MS)
  }

  if (!activeNoteId) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex h-full flex-col items-center justify-center gap-6"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-lg border border-[#e8e4df]">
          <Sparkles className="h-12 w-12 text-[#d4a574]/60" />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-[#2d2a26]">No note selected</p>
          <p className="text-sm text-[#8b8680]">Select a note from the sidebar or create a new one</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="relative h-full">
      <div className="absolute left-0 top-0 flex items-center gap-2 text-[#8b8680]">
        <PenLine className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">Editor</span>
      </div>
      <textarea
        value={localContent}
        onChange={handleChange}
        placeholder="Start writing your thoughts..."
        className="h-full w-full resize-none border-0 bg-transparent pt-8 text-lg leading-relaxed text-[#2d2a26] placeholder:text-[#a8a29e] focus:outline-none focus:ring-0"
        spellCheck={false}
      />
    </div>
  )
}
