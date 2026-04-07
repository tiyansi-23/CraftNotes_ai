import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET /api/notes - Get all notes for current user
export async function GET() {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find user in DB
    const user = await db.user.findUnique({
      where: { clerkId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get all notes for user
    const notes = await db.note.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    })

    return NextResponse.json({ success: true, notes })
  } catch (error) {
    console.error("Error fetching notes:", error)
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    )
  }
}

// POST /api/notes - Create a new note
export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find user in DB
    const user = await db.user.findUnique({
      where: { clerkId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Parse request body
    const body = await req.json().catch(() => ({}))
    const { title = "Untitled", content = "" } = body

    // Create note
    const note = await db.note.create({
      data: {
        userId: user.id,
        title,
        content,
      },
    })

    return NextResponse.json({ success: true, note }, { status: 201 })
  } catch (error) {
    console.error("Error creating note:", error)
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    )
  }
}
