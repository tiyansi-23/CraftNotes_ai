import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

// GET /api/notes/[id] - Get a single note by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: clerkId } = await auth()
    const { id } = await params

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { clerkId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const note = await db.note.findUnique({
      where: { id },
    })

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    if (note.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({ success: true, note })
  } catch (error) {
    console.error("Error fetching note:", error)
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    )
  }
}

// PATCH /api/notes/[id] - Update a note
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: clerkId } = await auth()
    const { id } = await params

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { clerkId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const note = await db.note.findUnique({
      where: { id },
    })

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    if (note.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await req.json().catch(() => ({}))
    const { title, content } = body

    const updateData: { title?: string; content?: string; updatedAt?: Date } = {}
    if (title !== undefined) updateData.title = title
    if (content !== undefined) updateData.content = content
    updateData.updatedAt = new Date()

    const updatedNote = await db.note.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, note: updatedNote })
  } catch (error) {
    console.error("Error updating note:", error)
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    )
  }
}

// DELETE /api/notes/[id] - Delete a note
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: clerkId } = await auth()
    const { id } = await params

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { clerkId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const note = await db.note.findUnique({
      where: { id },
    })

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    if (note.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await db.note.delete({
      where: { id },
    })

    return NextResponse.json(
      { success: true, message: "Note deleted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting note:", error)
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    )
  }
}
