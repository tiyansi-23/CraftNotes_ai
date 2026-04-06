import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/prisma"
import { Dashboard } from "@/components/dashboard"
import { getNotesByUser } from "@/app/actions/notes"
import { Button } from "@/components/ui/button"
import { SignInModalButton } from "@/components/sign-in-modal-button"
import { PenLine, Sparkles } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const { userId: clerkId } = await auth()

  // If not logged in, show public view with sign in prompt
  if (!clerkId) {
    return (
      <div className="relative min-h-screen bg-[#faf8f5] overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute w-[600px] h-[600px] bg-[#e6d5c3] rounded-full blur-3xl opacity-30 top-[-200px] right-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-[#d4e4d4] rounded-full blur-3xl opacity-20 bottom-[-150px] left-[-150px]" />

        {/* Noise texture */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.02] z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Navigation */}
        <nav className="relative z-20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#2d2a26] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <PenLine className="w-5 h-5 text-[#faf8f5]" />
              </div>
              <span className="text-xl font-bold text-[#2d2a26]">CraftNotes</span>
            </Link>
            <Link href="/sign-in">
              <Button variant="ghost" className="text-[#6b6560] hover:text-[#2d2a26] hover:bg-[#f0ebe5]">
                Sign In
              </Button>
            </Link>
          </div>
        </nav>

        {/* Main content */}
        <div className="relative z-20 flex min-h-[80vh] items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#e8e4df] mb-8">
              <Sparkles className="w-4 h-4 text-[#d4a574]" />
              <span className="text-sm text-[#6b6560]">Your creative space awaits</span>
            </div>

            <h1 
              className="text-5xl md:text-6xl font-bold text-[#2d2a26] mb-6 leading-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Ready to capture your ideas?
            </h1>

            <p className="text-xl text-[#6b6560] mb-10 max-w-xl mx-auto leading-relaxed">
              Sign in to access your notes, organize your thoughts, and let your creativity flow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignInModalButton />
              <Link href="/sign-up">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#2d2a26] text-[#2d2a26] hover:bg-[#f0ebe5] rounded-full px-8 py-6 text-lg"
                >
                  Create Account
                </Button>
              </Link>
            </div>
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
