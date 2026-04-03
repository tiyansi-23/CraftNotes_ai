# CraftNotes_ai — Implementation Plan

This plan divides the project build process into logical, actionable chunks based on the architecture and requirements. Use this checklist to track progress throughout the development.

---

## Phase 1: Project Initialization & UI Base

- [x] **1.1 Create Next.js Project** — Setup Next.js 15 App Router with TypeScript and Tailwind CSS.
- [x] **1.2 Install Core Dependencies** — Install Clerk, Prisma, OpenAI, Fuse.js, next-themes, and sonner.
- [x] **1.3 Initialize Shadcn/UI** — Setup Shadcn components (button, card, input, textarea, dialog, sidebar).
- [x] **1.4 Configure Prettier** — Set up Tailwind CSS plugin for prettier.
- [x] **1.5 Configure ESLint** — Add rules to ignore unescaped entities for JSX.
- [x] **1.6 Build Theme Provider & Dark Mode** — Create RootLayout wrapper with `next-themes` and `sonner` toaster.
- [x] **1.7 Build Header Component** — Create Header with Navigation, App Logo, ThemeToggle, and User Email UI.

---

## Phase 2: Authentication & Database Setup

- [x] **2.1 Create Neon Database** — Initialize Neon Postgres, fetch URL, and set up `.env.local`.
- [x] **2.2 Set Up Clerk Auth** — Get API keys from Clerk dashboard and add to environment variables.
- [x] **2.3 Create Clerk Clients** — Build browser (`lib/clerk/client.ts`) and server (`lib/clerk/server.ts`) clients.
- [x] **2.4 Create Prisma Singleton** — Configure the db client in `lib/prisma.ts`.
- [x] **2.5 Run Prisma Migration** — Define models (`User`, `Note`) and run `npx prisma migrate dev`.
- [x] **2.6 Build Login Page** — Create the UI and logic for `/login` page using Clerk actions.
- [x] **2.7 Build Signup Page** — Create `/signup` flow which automatically syncs registered users to Neon DB using Prisma.
- [x] **2.8 Build Middleware** — Construct `middleware.ts` to manage route guarding between auth/unauth states.

---

## Phase 3: Core Note Functionality (CRUD)

- [x] **3.1 Create Note Context Provider** — Establish React Context for active note text state (`providers/NoteProvider.tsx`).
  - Create `NoteProvider` with `useState` for `activeNoteId` and `activeNoteContent`.
  - Export `useNote()` custom hook for consuming context across components.
  - Wrap the app layout (or dashboard layout) with `<NoteProvider>`.

- [x] **3.2 Create Server Actions for Notes** — Implement CRUD operations for Notes (`actions/notes.ts`).
  - `createNote(userId)` — inserts a new blank note and returns the created record.
  - `getNotesByUser(userId)` — fetches all notes for a user, ordered by `updatedAt` descending.
  - `getNoteById(noteId)` — fetches a single note by ID (for hydrating active note on load).
  - `updateNoteContent(noteId, content)` — updates note body; also updates `updatedAt` timestamp.
  - `updateNoteTitle(noteId, title)` — updates note title separately (auto-derived or manual).
  - `deleteNote(noteId)` — deletes a note and returns remaining notes for the user.
  - Add `"use server"` directive at the top of the file; use `db` from `lib/prisma.ts`.

- [x] **3.3 Build NoteTextInput** — Build a textarea component with a 1-second debounce auto-save feature.
  - Render a full-height `<textarea>` (no border, no outline) bound to `activeNoteContent` from context.
  - On every keystroke, update local state immediately for a responsive feel.
  - Use `useRef` + `setTimeout`/`clearTimeout` to debounce `updateNoteContent` server action by 1 second.
  - Show a subtle "Saving…" / "Saved" status indicator (e.g., small text in the corner).
  - Handle edge cases: don't save if content hasn't changed; clear debounce timer on component unmount.

- [x] **3.4 Build Sidebar** — Construct Sidebar with Fuse.js fuzzy search, fetching user notes, and note selection UI.
  - Fetch all notes for the logged-in user via `getNotesByUser` on initial load (server component or `useEffect`).
  - Integrate Fuse.js: index note titles and content; re-run search on every keystroke in the search input.
  - Display note list items showing: title (or first line of content), truncated preview, and relative timestamp.
  - On note click: set `activeNoteId` and `activeNoteContent` in context to hydrate the editor.
  - Add a "New Note" button that calls `createNote`, then immediately selects the new note.
  - Highlight the currently active note in the list.
  - Handle empty state: show "No notes yet" when note list is empty.

- [x] **3.5 Auto-Create First Note** — Develop an Edge API route (`api/auth/check`) to give new users an initial blank note.
  - Create `app/api/auth/check/route.ts` configured for the Edge runtime.
  - On GET request: verify the Clerk session, look up the user in the DB, check if they have zero notes.
  - If zero notes exist: call `createNote(userId)` to provision a welcome/blank note automatically.
  - Return a JSON response indicating whether a note was created.
  - Call this endpoint once after successful login/signup (e.g., in the dashboard layout's `useEffect` or server component).

---

## Phase 4: AI Integration

- [x] **4.1 Configure OpenAI SDK** — Set up server-side OpenAI client (`lib/openai.ts`).
  - Install `openai` npm package if not already present.
  - Initialise `new OpenAI({ apiKey: process.env.OPENAI_API_KEY })` and export the singleton.
  - Add `OPENAI_API_KEY` to `.env.local` and to Vercel environment variables later.

- [x] **4.2 Build AI Server Action** — Create the Server Action to inject note context and prompt GPT-4o Mini (`actions/ai.ts`).
  - Accept `userMessage: string` and `noteContent: string` as parameters.
  - Build a system prompt that instructs the model to act as a note-aware assistant.
  - Inject the current note content into the system prompt as context.
  - Call `openai.chat.completions.create` with model `gpt-4o-mini`, passing system + user messages.
  - Return the assistant's reply as an HTML-formatted string (instruct the model to respond in HTML).
  - Handle errors gracefully: return a fallback error message string on failure.

- [x] **4.3 Build AskAI Dialog** — Create a Chat UI Modal that properly renders HTML outputs from AI responses.
  - Use a Shadcn `<Dialog>` triggered by a button in the Header or editor toolbar.
  - Maintain a `messages` array in local state: `{ role: "user" | "assistant", content: string }[]`.
  - Render user messages as plain text; render assistant messages via `dangerouslySetInnerHTML` for HTML output.
  - On user submit: append user message to state, call `askAI` server action, append AI response.
  - Show a loading spinner or "Thinking…" placeholder while the action is in-flight.
  - Include a clear button to reset the conversation.
  - Scope the dialog's CSS so injected HTML (lists, headings, code blocks) is styled correctly inside the chat bubble.

---

## Phase 5: Deployment to Vercel

- [ ] **5.1 Update `package.json` Build Script** — Incorporate `prisma generate` step in the Next.js build command.
  - Change the `build` script to: `"prisma generate && next build"`.
  - This ensures Prisma Client is generated fresh in the Vercel build environment.

- [ ] **5.2 Push to GitHub** — Add, commit, and push all project history.
  - Ensure `.env.local` is listed in `.gitignore` (never commit secrets).
  - Create a clean initial commit or push incremental commits with clear messages.

- [ ] **5.3 Deploy on Vercel** — Link repository to Vercel, configure environment, and deploy.
  - Import the GitHub repository on the Vercel dashboard.
  - Add all required environment variables: `DATABASE_URL`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `OPENAI_API_KEY`, and any Clerk redirect URL vars.
  - Set the Edge runtime region closest to your Neon database region to minimize latency.
  - Trigger the initial deployment and monitor the build logs for errors.

- [ ] **5.4 Verify Production** — Smoke test all features in the live environment.
  - Auth: sign up a new user, verify DB record is created, verify welcome note is auto-created.
  - Notes: create, edit (auto-save), search via fuzzy search, and delete a note.
  - AI Chat: open the AskAI dialog, ask a question, verify HTML response renders correctly.
  - Theme: toggle dark/light mode and verify persistence.
  - Edge cases: try accessing protected routes while logged out; verify middleware redirects correctly.

---

## Bonus / Post-Launch Improvements (Optional)

- [ ] **B.1 Note Title Auto-Derivation** — Extract the first non-empty line of note content as the display title.
- [ ] **B.2 Keyboard Shortcuts** — Add `Cmd/Ctrl + K` to open AskAI dialog; `Cmd/Ctrl + N` for a new note.
- [ ] **B.3 Note Deletion Confirmation** — Add a confirm dialog before deleting a note to prevent accidental loss.
- [ ] **B.4 Optimistic UI Updates** — Update sidebar list immediately on note create/delete before server confirmation.
- [ ] **B.5 Rate Limiting on AI Action** — Add basic rate limiting on the `askAI` server action to prevent API abuse.
- [ ] **B.6 Mobile Responsive Layout** — Ensure Sidebar collapses into a drawer on smaller screen sizes.