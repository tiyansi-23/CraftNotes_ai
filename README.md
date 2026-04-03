# � CraftNotes_ai
### AI-Powered Smart Note-Taking Application
> **Production Level Project** | Next.js 16 • Clerk Auth • Neon DB • Prisma ORM • OpenAI GPT-4o Mini

---

## 📌 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Complete Tech Stack](#2-complete-tech-stack)
3. [Project Folder Structure](#3-project-folder-structure)
4. [Environment Variables](#4-environment-variables)
5. [Database Schema](#5-database-schema-prisma--neon-db)
6. [Step-by-Step Build Plan](#6-step-by-step-build-plan)
7. [AI Agent Rules (.cursorrules)](#7-ai-agent-rules-cursorrules)
8. [Skills Required](#8-skills-required-for-this-project)
9. [Neon DB Setup Guide](#9-neon-db-setup-guide)
10. [Testing Checklist](#10-testing-checklist)
11. [Quick Commands Reference](#11-quick-commands-reference)
12. [Learning Resources](#12-learning-resources--links)

---

## 1. Project Overview

**CraftNotes_ai** is a full-stack, AI-powered note-taking web application built for production use. It allows users to create, manage, search, and interact with their notes using an integrated AI assistant powered by **OpenAI GPT-4o Mini**.

> **Vision:** Build a smart, secure, and scalable note-taking app that demonstrates mastery of full-stack development, AI integration, database management, authentication systems, and cloud deployment.

### ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 Authentication | Secure login/signup with Clerk (email + password, OAuth) |
| 💾 Auto-Save | Debounced auto-save after user stops typing (1 second delay) |
| 🔍 Fuzzy Search | Fuse.js-powered search across all notes with partial matching |
| 🤖 AI Assistant | Ask AI button opens a chat to summarize or quiz notes using OpenAI |
| 🌙 Dark Mode | System-aware dark/light toggle using next-themes |
| 📝 Auto First Note | Middleware creates a blank note for new users automatically |
| 📱 Responsive UI | Mobile-first Tailwind CSS + Shadcn/UI components |
| 🛡️ Protected Routes | Middleware guards all pages; redirects unauthenticated users |
| ☁️ Cloud Deployment | Hosted on Vercel with Neon serverless PostgreSQL |

---

## 2. Complete Tech Stack

### 🖥️ Frontend

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15 (App Router) | React framework with Server + Client components |
| React | 19 | UI rendering and component state management |
| TypeScript | 5.x | Type safety across the entire codebase |
| Tailwind CSS | 3.4+ | Utility-first responsive styling |
| Shadcn/UI | Latest | Pre-built accessible UI components |
| next-themes | Latest | Dark/Light mode toggle with persistence |
| Sonner | Latest | Global notification toasts |

### 🗄️ Backend & Database

| Technology | Version | Purpose |
|---|---|---|
| Clerk | Latest | Authentication (email/password + session management + OAuth) |
| Neon DB | Serverless PostgreSQL | Primary database (replaces Supabase DB) |
| Prisma ORM | 5.x | Type-safe database client and migrations |
| Next.js API Routes | Built-in | Edge-compatible endpoints for middleware checks |
| Next.js Middleware | Built-in | Route protection and auto-note creation |

### 🤖 AI & Search
| Next.js Server Actions | Built-in | Server-side logic for CRUD operations |

| Technology | Version | Purpose |
|---|---|---|
| OpenAI SDK | 4.x | GPT-4o Mini — note summarization and quiz |
| Fuse.js | 7.x | Client-side fuzzy search for notes sidebar |

### 🛠️ Developer Tools

| Technology | Version | Purpose |
|---|---|---|
| ESLint | 9.x | Linting with unescaped entity rules for JSX |
| Prettier | 3.x | Code formatting with Tailwind class sorting plugin |
| pnpm | 9.x | Fast, disk-efficient package manager |
| Git + GitHub | Latest | Version control and CI/CD trigger for Vercel |
| Vercel | Latest | Production deployment with edge functions |

### 🏗️ Architecture Flow

```
Browser (React / Next.js App Router)
        │
        ├──► Server Actions / API Routes
        │           │
        │           └──► Prisma ORM ──► Neon PostgreSQL
        │
        ├──► Clerk Auth ──► JWT Session ──► Next.js Middleware (route guard)
        │
        └──► OpenAI API (via Server Action) ──► AI HTML response ──► dangerouslySetInnerHTML
```

---

## 3. Project Folder Structure

```
CraftNotes_ai/
├── prisma/
│   └── schema.prisma              # Prisma models: User, Note
├── public/                        # Static assets (icons, images)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── (main)/
│   │   │   └── notes/
│   │   │       └── [noteId]/
│   │   │           └── page.tsx
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── check/
│   │   │           └── route.ts   # Edge-safe API route for middleware
│   │   │   └── clerk/
│   │   │       └── route.ts      # Clerk webhook route (optional)
│   │   ├── layout.tsx             # Root layout with ThemeProvider + Toaster
│   │   └── page.tsx               # Home redirect → /notes
│   │
│   ├── components/
│   │   ├── ui/                    # Shadcn auto-generated components
│   │   ├── Header.tsx             # Nav, logo, theme toggle, user email
│   │   ├── NoteTextInput.tsx      # Textarea with 1s debounce auto-save
│   │   ├── Sidebar.tsx            # Fuse.js search + note list + CRUD buttons
│   │   ├── AskAiDialog.tsx        # Chat modal with AI (dangerouslySetInnerHTML)
│   │   └── ThemeToggle.tsx        # Dark/light toggle button
│   │
│   ├── actions/
│   │   ├── notes.ts               # createNote, deleteNote, updateNote, getAllNotes
│   │   └── ai.ts                  # askAI server action → OpenAI
│   │
│   ├── providers/
│   │   └── NoteProvider.tsx       # React Context for active note text state
│   │
│   ├── lib/
│   │   ├── prisma.ts              # Singleton Prisma client
│   │   ├── openai.ts              # OpenAI client instance
│   │   ├── clerk/
│   │   │   ├── client.ts          # Browser Clerk client
│   │   │   └── server.ts          # Server Clerk client (with cookies)
│   │   └── utils.ts               # cn() and other helper functions
│   │
│   │   └── middleware.ts        # Clerk middleware - route guard + auto-note creation
│
├── .env.local                     # ⚠️ Environment variables — NEVER commit
├── .env.example                   # Template for env vars (commit this)
├── .cursorrules                   # AI agent rules for Cursor IDE
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Environment Variables

Create `.env.local` in the root directory. **NEVER commit this file.**  
Make sure `.env.local` is in your `.gitignore`.

```env
# ─── Clerk Auth ───────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# ─── Neon Database (via Prisma) ───────────────────────────
DATABASE_URL=postgresql://user:password@ep-xxxx.neon.tech/neondb?sslmode=require

# ─── OpenAI ───────────────────────────────────────────────
OPENAI_API_KEY=sk-proj-your_openai_key_here
```

Create `.env.example` (safe to commit — no real values):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
OPENAI_API_KEY=
```

> ⚠️ **Security Rule:** NEVER use `NEXT_PUBLIC_` prefix for `DATABASE_URL` or `OPENAI_API_KEY`. These must stay server-side only. `NEXT_PUBLIC_` variables are exposed to the browser bundle.

---

## 5. Database Schema (Prisma + Neon DB)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
  notes     Note[]   // one-to-many: one user → many notes
}

model Note {
  id        String   @id @default(cuid())
  text      String   @default("")
  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
}
```

Run migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma studio   # open visual DB browser to verify tables
```

---

## 6. Step-by-Step Build Plan

---

### ⚡ Phase 1: Project Initialization & UI Base

#### Step 1.1 — Create Next.js Project

```bash
npx create-next-app@latest goat-notes
```

Select options:
- TypeScript → **Yes**
- Tailwind CSS → **Yes**
- App Router → **Yes**
- `src/` directory → **Yes**
- ESLint → **Yes**
- Import alias → **Yes** (`@/*`)

#### Step 1.2 — Install Core Dependencies

```bash
cd goat-notes

# Auth + DB
pnpm add @clerk/nextjs
pnpm add @prisma/client prisma

# AI + Search
pnpm add openai
pnpm add fuse.js

# UI
pnpm add next-themes sonner

# Dev tools
pnpm add -D prettier prettier-plugin-tailwindcss
```

#### Step 1.3 — Initialize Shadcn/UI

```bash
npx shadcn@latest init
# Choose: New York style | Zinc color | CSS variables → Yes

npx shadcn@latest add button card input textarea dialog sidebar
```

#### Step 1.4 — Configure Prettier

Create `.prettierrc` in root:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

#### Step 1.5 — Configure ESLint

In `next.config.ts`:

```ts
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
}
```

In `eslint.config.mjs`, add rule to ignore unescaped entities:

```js
rules: {
  'react/no-unescaped-entities': 'off'
}
```

#### Step 1.6 — Build Theme Provider & Dark Mode

Wrap `app/layout.tsx` with `ThemeProvider` from `next-themes`. Add `ThemeToggle` component with sun/moon icons. Add `<Toaster />` from `sonner` to layout.

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

#### Step 1.7 — Build Header Component

`src/components/Header.tsx` — navigation links, app logo, ThemeToggle, user email display using Shadcn `Button`.

---

### 🔐 Phase 2: Authentication & Database Setup

#### Step 2.1 — Create Neon Database

1. Go to [neon.tech](https://neon.tech) → Create new project → name it `goat-notes`
2. Select region closest to users (AWS Mumbai / Singapore)
3. Dashboard → Connection Details → copy connection string
4. Paste as `DATABASE_URL` in `.env.local`

```bash
npx prisma init   # creates prisma/schema.prisma
```

#### Step 2.2 — Set Up Clerk Auth

1. Go to [clerk.com](https://clerk.com) → Create new project
2. Copy **Publishable Key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
3. Copy **Secret Key** → `CLERK_SECRET_KEY`

> We use Clerk **ONLY for Auth**. The database is Neon DB via Prisma.

#### Step 2.3 — Create Clerk Clients

```ts
// src/lib/clerk/client.ts  (browser)
import { Clerk } from '@clerk/nextjs'
export const createClient = () =>
  Clerk({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
  })
```

```ts
// src/lib/clerk/server.ts  (server)
import { Clerk } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
export const createClient = () => {
  const cookieStore = cookies()
  return Clerk({
    secretKey: process.env.CLERK_SECRET_KEY!,
    apiHost: 'https://api.clerk.cloud',
    cookies: { getAll: () => cookieStore.getAll(), setAll: (c) => c.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) },
  })
}
```

#### Step 2.4 — Create Prisma Singleton

```ts
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const db = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

#### Step 2.5 — Run Prisma Migration

```bash
npx prisma migrate dev --name init
npx prisma studio   # verify User and Note tables exist
```

#### Step 2.6 — Build Login Page

`src/app/(auth)/login/page.tsx` — Shadcn `Card` with email/password fields.

```tsx
'use client'
import { useTransition } from 'react'
import { createClient } from '@/lib/clerk/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const clerk = createClient()

  const handleLogin = (formData: FormData) => {
    startTransition(async () => {
      const { error } = await clerk.signIn({
        identifier: formData.get('email') as string,
        password: formData.get('password') as string,
      })
      if (error) { toast.error(error.message); return }
      router.push('/notes')
    })
  }
  // ... JSX with Card, inputs, Button disabled={isPending}
}
```

#### Step 2.7 — Build Signup Page

On signup: create Clerk Auth user **AND** insert a row in Neon DB `User` table via Prisma to link accounts.

```ts
// In signup server action
const { data, error } = await clerk.signUp({
  email: email,
  password: password,
})
if (!error && data.user) {
  await db.user.create({ data: { id: data.user.id, email } })
}
```

#### Step 2.8 — Build Middleware

```ts
// src/middleware.ts
import { createServerClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  // 1. Refresh Clerk session
  // 2. If on /login or /signup and logged in → redirect to /notes
  // 3. If on /notes and NOT logged in → redirect to /login
  // 4. If logged in + no notes → call API route to create first note
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

---

### 📝 Phase 3: Core Note Functionality (CRUD)

#### Step 3.1 — Create Note Context Provider

```tsx
// src/providers/NoteProvider.tsx
'use client'
import { createContext, useContext, useState } from 'react'

type NoteContextType = { noteText: string; setNoteText: (t: string) => void }
const NoteContext = createContext<NoteContextType | null>(null)

export function NoteProvider({ children, initialText }: { children: React.ReactNode; initialText: string }) {
  const [noteText, setNoteText] = useState(initialText)
  return <NoteContext.Provider value={{ noteText, setNoteText }}>{children}</NoteContext.Provider>
}

export const useNote = () => {
  const ctx = useContext(NoteContext)
  if (!ctx) throw new Error('useNote must be used within NoteProvider')
  return ctx
}
```

#### Step 3.2 — Create Server Actions for Notes

```ts
// src/actions/notes.ts
'use server'
import { db } from '@/lib/prisma'
import { createClient } from '@/lib/clerk/server'

export async function createNote(userId: string) {
  const note = await db.note.create({ data: { authorId: userId } })
  return note.id
}

export async function deleteNote(noteId: string, userId: string) {
  await db.note.delete({ where: { id: noteId, authorId: userId } })
}

export async function updateNote(noteId: string, text: string, userId: string) {
  await db.note.update({ where: { id: noteId, authorId: userId }, data: { text } })
}

export async function getAllNotes(userId: string) {
  return db.note.findMany({ where: { authorId: userId }, orderBy: { updatedAt: 'desc' } })
}
```

#### Step 3.3 — Build NoteTextInput with Debounce

```tsx
// src/components/NoteTextInput.tsx
'use client'
import { useEffect, useTransition } from 'react'
import { useNote } from '@/providers/NoteProvider'
import { updateNote } from '@/actions/notes'
import { Textarea } from '@/components/ui/textarea'

export default function NoteTextInput({ noteId, userId }: { noteId: string; userId: string }) {
  const { noteText, setNoteText } = useNote()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTransition(() => updateNote(noteId, noteText, userId))
    }, 1000)
    return () => clearTimeout(timeout)
  }, [noteText, noteId, userId])

  return (
    <Textarea
      value={noteText}
      onChange={(e) => setNoteText(e.target.value)}
      placeholder="Start typing your note..."
      className="min-h-screen resize-none border-none focus-visible:ring-0 text-base"
    />
  )
}
```

#### Step 3.4 — Build Sidebar with Fuzzy Search

```tsx
// src/components/Sidebar.tsx
'use client'
import Fuse from 'fuse.js'
import { useState, useMemo } from 'react'

export default function Sidebar({ notes, currentNoteId, userId }) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(() => new Fuse(notes, { keys: ['text'], threshold: 0.4 }), [notes])
  const results = query ? fuse.search(query).map(r => r.item) : notes

  return (
    // Input for search query
    // Map over results → show note preview
    // Each note links to /notes/[noteId]
    // Delete button calls deleteNote server action
    // New Note button calls createNote server action
  )
}
```

#### Step 3.5 — Auto-Create First Note (API Route for Middleware)

```ts
// src/app/api/auth/check/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { createClient } from '@/lib/clerk/server'

export async function GET() {
  const clerk = createClient()
  const { data: { user } } = await clerk.getUser()
  if (!user) return NextResponse.json({ hasNotes: false })

  const count = await db.note.count({ where: { authorId: user.id } })
  if (count === 0) {
    const note = await db.note.create({ data: { authorId: user.id } })
    return NextResponse.json({ hasNotes: false, firstNoteId: note.id })
  }
  return NextResponse.json({ hasNotes: true })
}
```

---

### 🤖 Phase 4: AI Integration

#### Step 4.1 — Configure OpenAI SDK

```ts
// src/lib/openai.ts
import OpenAI from 'openai'
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
```

#### Step 4.2 — Build AI Server Action

```ts
// src/actions/ai.ts
'use server'
import { openai } from '@/lib/openai'
import { db } from '@/lib/prisma'
import { createClient } from '@/lib/clerk/server'

export async function askAI(userMessage: string, conversationHistory: { role: string; content: string }[]) {
  const clerk = createClient()
  const { data: { user } } = await clerk.getUser()
  if (!user) throw new Error('Unauthorized')

  // 1. Fetch all user notes
  const notes = await db.note.findMany({ where: { authorId: user.id } })
  const notesContext = notes.map((n, i) => `Note ${i + 1}:\n${n.text}`).join('\n\n---\n\n')

  // 2. Build messages array
  const messages = [
    {
      role: 'system',
      content: `You are a helpful study assistant. Answer based ONLY on the user's notes below.
Format ALL responses using valid HTML tags: <p>, <ul>, <li>, <strong>, <em>, <h3>.
Be concise, clear, and educational.

USER NOTES:
${notesContext || 'No notes available yet.'}`,
    },
    ...conversationHistory,
    { role: 'user', content: userMessage },
  ]

  // 3. Call GPT-4o Mini
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    max_tokens: 1000,
  })

  return response.choices[0].message.content
}
```

#### Step 4.3 — Build AskAI Dialog

```tsx
// src/components/AskAiDialog.tsx
'use client'
import { useState, useTransition } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { askAI } from '@/actions/ai'

type Message = { role: 'user' | 'assistant'; content: string }

export default function AskAiDialog() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = { role: 'user', content: input }
    setInput('')

    startTransition(async () => {
      const response = await askAI(input, messages)
      setMessages(prev => [...prev, userMsg, { role: 'assistant', content: response ?? '' }])
    })
  }

  return (
    <Dialog>
      <DialogTrigger>Ask AI</DialogTrigger>
      <DialogContent>
        {/* Message list */}
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            {m.role === 'assistant'
              ? <div dangerouslySetInnerHTML={{ __html: m.content }} />
              : <p>{m.content}</p>
            }
          </div>
        ))}
        {/* Input + Send button */}
      </DialogContent>
    </Dialog>
  )
}
```

---

### 🚀 Phase 5: Deployment to Vercel

#### Step 5.1 — Update package.json Build Script

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

#### Step 5.2 — Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial commit — goat notes full stack app"
git branch -M main
git remote add origin https://github.com/yourusername/goat-notes.git
git push -u origin main
```

#### Step 5.3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Import GitHub Repository**
2. Set **Framework Preset** to `Next.js`
3. Set **Build Command** to: `pnpm dlx prisma generate && next build`
4. Add all environment variables from `.env.local` in the Vercel dashboard
5. Click **Deploy** ✅

#### Step 5.4 — Verify Production

- [ ] Auth flow: signup → login → logout
- [ ] Note creation, editing, deletion
- [ ] AI chat with multiple questions
- [ ] Dark/light mode toggle
- [ ] Search with partial text
- [ ] Check Neon DB dashboard for data

---

## 7. AI Agent Rules (.cursorrules)

Create `.cursorrules` file in the root of your project. This tells Cursor AI (and Windsurf/Copilot) how to write code for your project:

```
# CraftNotes_ai — AI AGENT RULES

## Stack
- Next.js 15 App Router (TypeScript)
- Clerk Auth (NOT Supabase Auth)
- Neon PostgreSQL via Prisma ORM
- OpenAI GPT-4o Mini
- Tailwind CSS + Shadcn/UI components

## Coding Rules
1. Always use TypeScript. No `any` types unless absolutely necessary.
2. All database calls go through Prisma (db client from lib/prisma.ts).
3. All auth checks use Clerk (`auth()` from `@clerk/nextjs`).
4. Server Actions use 'use server' at top of file. Client components use 'use client'.
5. NEVER expose DATABASE_URL or OPENAI_API_KEY to the client side.
6. NEVER use NEXT_PUBLIC_ prefix for secret keys.
7. Wrap ALL server action calls in useTransition for loading/isPending states.
8. Use Shadcn/UI components from /components/ui/. Do NOT install raw Radix primitives.
9. Validate user ownership before any DB mutation — check authorId === userId.
10. API Routes are ONLY for middleware-level edge operations.
    Use Server Actions for all regular CRUD.
11. Use Fuse.js for note search. Do NOT create a search API route.
12. AI responses MUST be rendered with dangerouslySetInnerHTML (they return HTML).
13. All pages under /notes/ require auth. Middleware handles this — do NOT add extra checks.
14. Run 'prisma generate' before 'next build' in all environments.
15. Use pnpm as the package manager consistently. Never mix with npm or yarn.
16. Show toast notifications from sonner for all user-facing errors and successes.
17. All server actions must be wrapped in try/catch and return { success, error? }.
18. The Note model MUST include authorId — never fetch notes without filtering by authorId.

## File Naming Conventions
- Components: PascalCase → NoteTextInput.tsx, AskAiDialog.tsx
- Server Actions: camelCase file → notes.ts, ai.ts
- Lib utilities: camelCase → prisma.ts, utils.ts
- API Routes: folder/route.ts pattern (Next.js App Router standard)

## Component Rules
- Prefer Server Components by default
- Add 'use client' ONLY when using: useState, useEffect, useTransition, event handlers, browser APIs
- Never fetch DB data directly in a Client Component — use Server Actions or pass as props

## Error Handling Pattern
// Standard server action return shape:
type ActionResult = { success: boolean; error?: string; data?: unknown }
```

---

## 8. Skills Required for This Project

### 8.1 Mandatory Technical Skills

| Skill | Why You Need It | Where to Learn |
|---|---|---|
| React.js (Hooks) | useState, useEffect, useTransition, useContext | react.dev/learn |
| Next.js 15 App Router | File routing, Server/Client components, layouts | nextjs.org/docs |
| TypeScript Basics | Type annotations, interfaces, generics | typescriptlang.org |
| Tailwind CSS | Utility classes, responsive design, dark mode | tailwindcss.com |
| Clerk | signIn, signUp, session, getUser | clerk.com/docs |
| Prisma ORM | Schema, migrate, CRUD operations | prisma.io/docs |
| PostgreSQL Basics | Tables, relations, primary/foreign keys | postgresql.org/docs |
| OpenAI API | chat.completions.create, system prompt, tokens | platform.openai.com/docs |
| Server Actions vs API Routes | When to use each in Next.js | nextjs.org/docs/app/api-reference |
| Git & GitHub | commit, push, branch, PR | git-scm.com |

### 8.2 Architecture Decisions — Key Design Choices

- Why **Server-Side Rendering (SSR)** vs **Client-Side Rendering (CSR)**?
- Why use **Server Actions** instead of API Routes for CRUD operations?
- How does **Clerk** handle JWT session management securely?
- Why **Prisma ORM** over raw SQL queries?
- What is **debouncing** and why implement it for auto-save?
- How does **Fuse.js fuzzy search** work and why choose it?
- How does **AI context injection** work? What is prompt engineering?
- Why **Neon DB serverless** over traditional PostgreSQL?
- What is the difference between **Edge Runtime** and **Node.js Runtime** in Next.js?
- How is `dangerouslySetInnerHTML` used safely for AI responses?
- Why separate **Clerk Auth** from **Neon DB** (database)?
- Why use a **Prisma singleton** pattern?

### 8.3 VS Code / Cursor Extensions to Install

Search these names on Google to install them:

| Extension Name | What It Does | Search On Google |
|---|---|---|
| **Cursor AI IDE** | AI-native code editor with agent mode | `Download Cursor AI IDE` |
| **Prisma Extension** | Schema syntax highlighting + intellisense | `Prisma VS Code extension` |
| **Tailwind IntelliSense** | Autocomplete Tailwind classes | `Tailwind CSS IntelliSense VS Code` |
| **ESLint Extension** | Real-time linting errors in editor | `ESLint VS Code extension` |
| **Prettier Extension** | Auto-format on save | `Prettier VS Code extension` |
| **GitLens** | Visualize git history and blame | `GitLens VS Code extension` |
| **Thunder Client** | Test API routes inside VS Code | `Thunder Client VS Code` |
| **DotENV** | Syntax highlighting for .env files | `DotENV VS Code extension` |
| **Error Lens** | Show errors inline in code | `Error Lens VS Code extension` |
| **Auto Rename Tag** | Rename HTML/JSX tags together | `Auto Rename Tag VS Code` |

---

## 9. Neon DB Setup Guide

### Step 1 — Create Neon Project

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Click **Create Project** → name it `CraftNotes_ai`
3. Select a region closest to your users (e.g., AWS Mumbai / Singapore)
4. Go to **Dashboard → Connection Details**
5. Copy the **Connection String**
6. Paste as `DATABASE_URL` in your `.env.local`

### Step 2 — Connection String Format

```
DATABASE_URL="postgresql://USER:PASSWORD@ep-XXXX.REGION.aws.neon.tech/neondb?sslmode=require"
```

### Step 3 — Enable Connection Pooling (Required for Vercel)

In Neon dashboard → Connection Details → toggle **Pooled Connection**.

```env
# Local development (direct connection)
DATABASE_URL=postgresql://...@ep-xxx.neon.tech/neondb?sslmode=require

# Production on Vercel (pooled connection)
DATABASE_URL=postgresql://...@ep-xxx-pooler.neon.tech/neondb?sslmode=require
```

> **Why Neon over Supabase DB?** Neon is a serverless PostgreSQL — it scales to zero, has connection pooling built-in, and works perfectly with Vercel's serverless functions. We use Clerk for authentication and Neon for the database.

---

## 10. Testing Checklist

### 🔐 Authentication Tests
- [ ] Sign up with new email → creates user in Clerk Auth AND Neon DB `User` table
- [ ] Log in with correct credentials → redirects to `/notes`
- [ ] Log in with wrong password → shows error toast
- [ ] Access `/notes` without login → redirects to `/login`
- [ ] Access `/login` while logged in → redirects to `/notes`
- [ ] Log out → session cleared → redirected to `/login`

### 📝 Note CRUD Tests
- [ ] New user sees a blank note automatically (middleware auto-create)
- [ ] Type in textarea → waits 1 second → saves (verify in Neon via Prisma Studio)
- [ ] Create new note → appears in sidebar
- [ ] Delete note → removed from sidebar and DB
- [ ] Search for partial word → Fuse.js returns relevant notes
- [ ] Navigate between notes → each shows correct saved content

### 🤖 AI Tests
- [ ] Click Ask AI → dialog opens
- [ ] Type "summarize my notes" → AI responds with HTML-formatted summary
- [ ] Type "quiz me on my notes" → AI generates quiz questions
- [ ] AI responses render with proper HTML formatting (bold, lists, paragraphs)
- [ ] Empty notes → AI responds gracefully ("No notes available yet")

### 🎨 UI/UX Tests
- [ ] Dark mode toggle → persists across page refresh
- [ ] Mobile responsive → sidebar collapses on small screens
- [ ] Loading states → button disabled/spinner while saving or asking AI
- [ ] Toast notifications → appear for errors and successes

---

## 11. Quick Commands Reference

### Development

```bash
pnpm dev              # Start dev server on localhost:3000
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

### Prisma

```bash
npx prisma init                    # Initialize Prisma in project
npx prisma migrate dev             # Create + apply a migration
npx prisma migrate dev --name init # Name the migration
npx prisma generate                # Regenerate Prisma client after schema change
npx prisma studio                  # Open visual DB browser at localhost:5555
npx prisma db push                 # Push schema changes without a migration file (fast)
npx prisma migrate reset           # ⚠️ Reset DB and rerun all migrations (deletes data)
```

### Shadcn/UI

```bash
npx shadcn@latest init                                 # Initialize Shadcn in project
npx shadcn@latest add button                           # Add single component
npx shadcn@latest add card dialog sidebar textarea input  # Add multiple at once
```

### Git

```bash
git status                              # See changed files
git add .                               # Stage all changes
git commit -m "feat: add AI chat"       # Commit with conventional message
git push                                # Push to GitHub (triggers Vercel deploy)
git pull                                # Pull latest changes
git log --oneline                       # See compact commit history
```

### Vercel CLI (optional)

```bash
pnpm add -g vercel
vercel                  # Deploy from terminal
vercel env pull         # Pull env vars from Vercel to local
```

---

## 12. Learning Resources & Links

### 📄 Official Documentation

| Resource | URL |
|---|---|
| Next.js 15 Docs | nextjs.org/docs |
| Clerk Docs | clerk.com/docs |
| Neon DB Docs | neon.tech/docs |
| Prisma Docs | prisma.io/docs |
| OpenAI API Reference | platform.openai.com/docs/api-reference |
| Shadcn/UI Components | ui.shadcn.com/docs/components |
| Fuse.js Docs | fusejs.io |
| Tailwind CSS Docs | tailwindcss.com/docs |
| next-themes | github.com/pacocoursey/next-themes |
| Sonner Toast | sonner.emilkowal.ski |

### 🎬 YouTube Tutorials (Search These Exact Terms)

| Topic | Search Term |
|---|---|
| Next.js 15 Full Course | `Next.js 15 App Router full tutorial 2024` |
| Clerk Auth Next.js | `Clerk auth Next.js 15 tutorial` |
| Prisma with Neon | `Prisma Neon DB Next.js setup guide` |
| OpenAI API Next.js | `OpenAI API Next.js server action tutorial` |
| Shadcn UI Tutorial | `shadcn ui next.js tutorial 2024` |
| Tailwind CSS Crash Course | `Tailwind CSS crash course beginner` |
| TypeScript for React | `TypeScript React beginners tutorial` |
| Git & GitHub basics | `Git GitHub tutorial beginners 2024` |

---

<div align="center">

**📝 CraftNotes_ai — Production Ready**

Built with Next.js 16 • Neon DB • Clerk Auth • Prisma ORM • OpenAI • Deployed on Vercel

*Built for real-world use*

</div>
