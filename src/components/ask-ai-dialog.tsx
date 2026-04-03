"use client"

import { useState, useRef, useEffect } from "react"
import { useNote } from "@/components/providers/note-provider"
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
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { activeNoteContent } = useNote()
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
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 rounded-full border-primary/20 bg-primary/5 px-4 text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Sparkles className="h-4 w-4" />
          Ask AI
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[600px] max-w-lg flex-col overflow-hidden rounded-2xl border-border/40 p-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border/30 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-md">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold">Ask AI</DialogTitle>
              <p className="text-xs text-muted-foreground">Powered by GPT-4o Mini</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearChat} 
              className="h-8 gap-1.5 rounded-lg text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </Button>
          )}
        </DialogHeader>

        {/* Chat Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-muted/20 to-muted/5 p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary/60" />
              </div>
              <div>
                <p className="font-medium text-foreground">How can I help you?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ask me anything about your note or request help writing.
                </p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-gradient-to-br from-primary/80 to-primary text-primary-foreground"
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
                      ? "bg-primary text-primary-foreground"
                      : "bg-background shadow-sm ring-1 ring-border/50 prose prose-sm dark:prose-invert"
                  }`}
                >
                  {message.role === "user" ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <div
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  )}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex max-w-[80%] items-center gap-2 rounded-2xl bg-background px-4 py-3 shadow-sm ring-1 ring-border/50">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-border/30 bg-background p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask something about your note..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="h-11 flex-1 rounded-xl border-border/30 bg-muted/30 text-sm focus-visible:ring-primary/20"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="h-11 w-11 rounded-xl p-0"
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
