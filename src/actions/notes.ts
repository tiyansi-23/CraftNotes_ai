"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createNote(userId: string) {
  const note = await db.note.create({
    data: {
      userId,
      title: "Untitled",
      content: "",
    },
  });
  revalidatePath("/dashboard");
  return note;
}

export async function getNotesByUser(userId: string) {
  const notes = await db.note.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
  return notes;
}

export async function getNoteById(noteId: string) {
  const note = await db.note.findUnique({
    where: { id: noteId },
  });
  return note;
}

export async function updateNoteContent(noteId: string, content: string) {
  const note = await db.note.update({
    where: { id: noteId },
    data: { content, updatedAt: new Date() },
  });
  revalidatePath("/dashboard");
  return note;
}

export async function updateNoteTitle(noteId: string, title: string) {
  const note = await db.note.update({
    where: { id: noteId },
    data: { title, updatedAt: new Date() },
  });
  revalidatePath("/dashboard");
  return note;
}

export async function deleteNote(noteId: string, userId: string) {
  await db.note.delete({
    where: { id: noteId },
  });
  const remainingNotes = await db.note.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
  revalidatePath("/dashboard");
  return remainingNotes;
}
