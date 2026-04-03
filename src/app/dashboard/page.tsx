import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/prisma"
import { Dashboard } from "@/components/dashboard"
import { getNotesByUser } from "@/app/actions/notes"
import { SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const { userId: clerkId } = await auth()

  // If not logged in, show public view with sign in prompt
  if (!clerkId) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">Welcome to CraftNotes</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Sign in to start creating and managing your notes.
            </p>
            <SignInButton mode="modal">
              <Button size="lg">Sign In to Continue</Button>
            </SignInButton>
          </div>
        </div>
      </div>
    )
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
