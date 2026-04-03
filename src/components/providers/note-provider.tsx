"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface NoteContextType {
  activeNoteId: string | null
  setActiveNoteId: (id: string | null) => void
  activeNoteContent: string
  setActiveNoteContent: (content: string) => void
  activeNoteTitle: string
  setActiveNoteTitle: (title: string) => void
  isSaving: boolean
  setIsSaving: (isSaving: boolean) => void
  lastSavedAt: Date | null
  setLastSavedAt: (date: Date | null) => void
}

const NoteContext = createContext<NoteContextType | undefined>(undefined)

export { NoteContext }

export function NoteProvider({ children }: { children: ReactNode }) {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const [activeNoteContent, setActiveNoteContent] = useState<string>("")
  const [activeNoteTitle, setActiveNoteTitle] = useState<string>("")
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)

  return (
    <NoteContext.Provider
      value={{
        activeNoteId,
        setActiveNoteId,
        activeNoteContent,
        setActiveNoteContent,
        activeNoteTitle,
        setActiveNoteTitle,
        isSaving,
        setIsSaving,
        lastSavedAt,
        setLastSavedAt,
      }}
    >
      {children}
    </NoteContext.Provider>
  )
}

export function useNote() {
  const context = useContext(NoteContext)
  if (context === undefined) {
    throw new Error("useNote must be used within a NoteProvider")
  }
  return context
}
