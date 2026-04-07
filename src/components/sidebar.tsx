"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import Fuse from "fuse.js"
import { useNote } from "@/components/providers/note-provider"
import { createNote, deleteNote, getNotesByUser, getNoteById } from "@/app/actions/notes"
import { ExportDialog } from "@/components/export-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, FileText, Search, Clock, Sparkles } from "lucide-react"
import { toast } from "sonner"

interface Note {
  id: string
  userId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface SidebarProps {
  userId: string
  initialNotes: Note[]
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - new Date(date).getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return new Date(date).toLocaleDateString()
}

function getNotePreview(content: string, maxLength: number = 60): string {
  const plainText = content.replace(/\n/g, " ").trim()
  if (plainText.length <= maxLength) return plainText
  return plainText.substring(0, maxLength) + "..."
}

export function Sidebar({ userId, initialNotes }: SidebarProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const {
    activeNoteId,
    setActiveNoteId,
    setActiveNoteContent,
    setActiveNoteTitle,
  } = useNote()

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(notes, {
      keys: ["title", "content"],
      threshold: 0.4,
      includeScore: true,
    })
  }, [notes])

  // Filter notes based on search query
  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes
    const results = fuse.search(searchQuery)
    return results.map((result) => result.item)
  }, [notes, searchQuery, fuse])

  const handleCreateNote = async () => {
    setIsCreating(true)
    try {
      const newNote = await createNote(userId)
      setNotes((prev) => [newNote, ...prev])
      setActiveNoteId(newNote.id)
      setActiveNoteContent(newNote.content)
      setActiveNoteTitle(newNote.title)
      toast.success("New note created")
    } catch (error) {
      toast.error("Failed to create note")
    } finally {
      setIsCreating(false)
    }
  }

  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleSelectNote = async (note: Note) => {
    setIsLoading(note.id)
    try {
      // Fetch fresh note data from database
      const freshNote = await getNoteById(note.id)
      if (freshNote) {
        setActiveNoteId(freshNote.id)
        setActiveNoteContent(freshNote.content)
        setActiveNoteTitle(freshNote.title)
      }
    } catch (error) {
      console.error("Failed to load note:", error)
      toast.error("Failed to load note")
    } finally {
      setIsLoading(null)
    }
  }

  const handleDeleteNote = async (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation()
    setDeletingId(noteId)
    try {
      const remainingNotes = await deleteNote(noteId, userId)
      setNotes(remainingNotes)
      if (activeNoteId === noteId) {
        const nextNote = remainingNotes[0]
        if (nextNote) {
          setActiveNoteId(nextNote.id)
          setActiveNoteContent(nextNote.content)
          setActiveNoteTitle(nextNote.title)
        } else {
          setActiveNoteId(null)
          setActiveNoteContent("")
          setActiveNoteTitle("")
        }
      }
      toast.success("Note deleted")
    } catch (error) {
      toast.error("Failed to delete note")
    } finally {
      setDeletingId(null)
    }
  }

  // Refresh notes when component mounts (for auto-created notes)
  useEffect(() => {
    const loadNotes = async () => {
      const freshNotes = await getNotesByUser(userId)
      setNotes(freshNotes)
      // If no active note but notes exist, select the first one
      if (!activeNoteId && freshNotes.length > 0 && !searchQuery) {
        const firstNote = freshNotes[0]
        setActiveNoteId(firstNote.id)
        setActiveNoteContent(firstNote.content)
        setActiveNoteTitle(firstNote.title)
      }
    }
    loadNotes()
  }, [userId])

  return (
    <div className="flex h-full flex-col bg-[#faf8f5]/50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e8e4df]/60 p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2d2a26]">
            <FileText className="h-4 w-4 text-[#faf8f5]" />
          </div>
          <h2 className="font-semibold text-[#2d2a26]">My Notes</h2>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCreateNote}
            disabled={isCreating}
            className="h-8 w-8 rounded-xl bg-[#d4a574]/10 hover:bg-[#d4a574]/20 text-[#d4a574]"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8680]" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 rounded-xl border-[#e8e4df]/60 bg-white/60 pl-10 text-sm placeholder:text-[#a8a29e] focus-visible:ring-[#d4a574]/30 focus-visible:border-[#d4a574]"
          />
        </div>
      </div>

      {/* Note List */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {filteredNotes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-4 p-8 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-[#e8e4df]">
              <Sparkles className="h-8 w-8 text-[#d4a574]/60" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#2d2a26]">
                {searchQuery ? "No notes match" : "No notes yet"}
              </p>
              <p className="mt-1 text-xs text-[#8b8680]">
                {searchQuery ? "Try a different search term" : "Create your first note to get started"}
              </p>
            </div>
            {!searchQuery && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCreateNote}
                disabled={isCreating}
                className="rounded-xl border-[#e8e4df] hover:bg-[#f0ebe5] hover:border-[#d4a574]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create note
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {filteredNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  onClick={() => handleSelectNote(note)}
                  className={`group flex w-full flex-col rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 ${
                    activeNoteId === note.id
                      ? "bg-white shadow-sm ring-1 ring-[#d4a574]/30"
                      : "hover:bg-white/60"
                  } ${isLoading === note.id ? "opacity-70" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`flex-1 truncate text-sm font-medium ${
                      activeNoteId === note.id ? "text-[#2d2a26]" : "text-[#2d2a26]"
                    }`}>
                      {note.title === "Untitled" && !note.content
                        ? "New Note"
                        : note.title}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDeleteNote(e, note.id)}
                      disabled={deletingId === note.id}
                      className="h-6 w-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#6b6560]">
                    {getNotePreview(note.content) || "No content"}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#8b8680]">
                    <Clock className="h-3 w-3" />
                    {formatRelativeTime(note.updatedAt)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer with Export */}
      <div className="border-t border-[#e8e4df]/60 p-4">
        <ExportDialog userId={userId} />
      </div>
    </div>
  )
}
