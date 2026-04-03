import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma"
import { createNote } from "@/app/actions/notes"

export const runtime = "edge"

export async function GET() {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Find user in our database
    let user = await db.user.findUnique({
      where: { clerkId },
      include: { notes: true },
    })

    // If user doesn't exist in DB yet, they might have just signed up
    // We don't auto-create user here - that should happen during signup flow
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found in database" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Check if user has any notes
    const noteCount = user.notes.length

    if (noteCount === 0) {
      // Create a welcome note for new users
      const welcomeNote = await createNote(user.id)
      await db.note.update({
        where: { id: welcomeNote.id },
        data: {
          title: "Welcome to CraftNotes AI",
          content:
            "# Welcome to CraftNotes AI!\n\nThis is your first note. Start typing to edit it.\n\n## Features:\n- Auto-save with debounce\n- Fuzzy search with Fuse.js\n- AI-powered assistance\n- Dark mode support\n\nClick the ✨ AI button to ask questions about your notes!",
        },
      })

      return new Response(
        JSON.stringify({
          success: true,
          message: "Welcome note created",
          noteId: welcomeNote.id,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "User already has notes",
        noteCount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    console.error("Error in auth check route:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
