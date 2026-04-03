"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useNote } from "@/components/providers/note-provider"
import { updateNoteContent } from "@/app/actions/notes"
import { PenLine, FileText } from "lucide-react"

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
    async (content: string) => {
      if (!activeNoteId || content === lastSavedContentRef.current) {
        return
      }

      setIsSaving(true)
      try {
        await updateNoteContent(activeNoteId, content)
        lastSavedContentRef.current = content
        setLastSavedAt(new Date())
      } catch (error) {
        console.error("Failed to save note:", error)
      } finally {
        setIsSaving(false)
      }
    },
    [activeNoteId, setIsSaving, setLastSavedAt]
  )

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setLocalContent(newContent)
    setActiveNoteContent(newContent)

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    // Set new timeout for debounced save
    saveTimeoutRef.current = setTimeout(() => {
      performSave(newContent)
    }, SAVE_DEBOUNCE_MS)
  }

  if (!activeNoteId) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-muted-foreground">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-muted/80 to-muted/40 shadow-lg">
          <FileText className="h-12 w-12 text-muted-foreground/60" />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-foreground">No note selected</p>
          <p className="text-sm text-muted-foreground">Select a note from the sidebar or create a new one</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      <div className="absolute left-0 top-0 flex items-center gap-2 text-muted-foreground/50">
        <PenLine className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">Editor</span>
      </div>
      <textarea
        value={localContent}
        onChange={handleChange}
        placeholder="Start writing your thoughts..."
        className="h-full w-full resize-none border-0 bg-transparent pt-8 text-lg leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0"
        spellCheck={false}
      />
    </div>
  )
}
