"use client"

import { useState, useRef, useEffect, useContext } from "react"
import { motion, AnimatePresence } from "motion/react"
import { NoteContext } from "@/components/providers/note-provider"
import { askAI } from "@/app/actions/ai"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Loader2, Trash2, Send, Bot, User } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AskAIDialog() {
  const noteContext = useContext(NoteContext)
  const activeNoteContent = noteContext?.activeNoteContent ?? ""
  
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await askAI(userMessage, activeNoteContent)
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "<p>Sorry, there was an error. Please try again.</p>" },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 rounded-full border-[#d4a574]/30 bg-[#d4a574]/10 px-4 text-[#d4a574] hover:bg-[#d4a574]/20 hover:text-[#b8925f]"
          >
            <Sparkles className="h-4 w-4" />
            Ask AI
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="flex h-[600px] max-w-lg flex-col overflow-hidden rounded-2xl border-[#e8e4df] bg-[#faf8f5] p-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-[#e8e4df] bg-white/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2d2a26] text-[#faf8f5] shadow-md">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-[#2d2a26]">Ask AI</DialogTitle>
              <p className="text-xs text-[#8b8680]">Powered by GPT-4o Mini</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearChat} 
              className="h-8 gap-1.5 rounded-lg text-[#6b6560] hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </Button>
          )}
        </DialogHeader>

        {/* Chat Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-[#faf8f5] p-6">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex h-full flex-col items-center justify-center gap-4 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d4a574]/10">
                  <Sparkles className="h-8 w-8 text-[#d4a574]/60" />
                </div>
                <div>
                  <p className="font-medium text-[#2d2a26]">How can I help you?</p>
                  <p className="mt-1 text-sm text-[#8b8680]">
                    Ask me anything about your note or request help writing.
                  </p>
                </div>
              </motion.div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.role === "user" 
                      ? "bg-[#2d2a26] text-[#faf8f5]" 
                      : "bg-[#d4a574] text-white"
                  }`}>
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-[#2d2a26] text-[#faf8f5]"
                        : "bg-white shadow-sm ring-1 ring-[#e8e4df] prose prose-sm"
                    }`}
                  >
                    {message.role === "user" ? (
                      <p className="text-sm">{message.content}</p>
                    ) : (
                      <div
                        className="text-sm leading-relaxed text-[#2d2a26]"
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d4a574] text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex max-w-[80%] items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-[#e8e4df]">
                <Loader2 className="h-4 w-4 animate-spin text-[#d4a574]" />
                <span className="text-sm text-[#6b6560]">Thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-[#e8e4df] bg-white/60 p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask something about your note..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="h-11 flex-1 rounded-xl border-[#e8e4df] bg-white text-sm text-[#2d2a26] placeholder:text-[#a8a29e] focus-visible:ring-[#d4a574]/30"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="h-11 w-11 rounded-xl bg-[#2d2a26] hover:bg-[#1a1815] p-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
