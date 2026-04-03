import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/prisma"
import { Dashboard } from "@/components/dashboard"
import { getNotesByUser } from "@/app/actions/notes"

export default async function DashboardPage() {
  const { userId: clerkId } = await auth()

  if (!clerkId) {
    redirect("/sign-in")
  }

  // Get user from database
  const user = await db.user.findUnique({
    where: { clerkId },
  })

  if (!user) {
    // User not synced to DB yet, redirect to sign-up flow
    redirect("/sign-up")
  }

  // Get user's notes
  const notes = await getNotesByUser(user.id)

  return <Dashboard userId={user.id} initialNotes={notes} />
}
