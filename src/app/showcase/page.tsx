"use client"

import { motion } from "motion/react"
import { SignInButton, SignUpButton, Show, SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  PenLine,
  Sparkles,
  ArrowRight,
  Zap,
  Search,
  Bot,
  Tag,
  FileText
} from "lucide-react"

// Mock note card for visual showcase
function MockNote({ title, content, tags, delay = 0, className = "" }: { 
  title: string
  content: string
  tags: string[]
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, rotate: 1, transition: { duration: 0.3 } }}
      className={`bg-white rounded-xl p-5 shadow-lg border border-[#e8e4df] cursor-pointer ${className}`}
    >
      <h4 className="font-semibold text-[#2d2a26] mb-2">{title}</h4>
      <p className="text-sm text-[#6b6560] line-clamp-3 mb-3">{content}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-1 bg-[#f0ebe5] text-[#8b8680] rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// Showcase section component
function ShowcaseSection({ 
  title, 
  description, 
  icon: Icon,
  children,
  reverse = false
}: { 
  title: string
  description: string
  icon: React.ElementType
  children: React.ReactNode
  reverse?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
    >
      <div className="flex-1">
        <div className="w-14 h-14 bg-[#d4a574]/10 rounded-2xl flex items-center justify-center mb-6">
          <Icon className="w-7 h-7 text-[#d4a574]" />
        </div>
        <h3 
          className="text-3xl md:text-4xl font-bold text-[#2d2a26] mb-4"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {title}
        </h3>
        <p className="text-lg text-[#6b6560] leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex-1 w-full">
        {children}
      </div>
    </motion.div>
  )
}

export default function ShowcasePage() {
  return (
    <div className="relative min-h-screen bg-[#faf8f5] overflow-hidden">
      {/* Background gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-[#e6d5c3] rounded-full blur-3xl opacity-20 top-[-400px] left-[-400px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] bg-[#d4e4d4] rounded-full blur-3xl opacity-15 bottom-[-300px] right-[-300px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 px-6 py-4 border-b border-[#e8e4df]/60"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#2d2a26] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <PenLine className="w-5 h-5 text-[#faf8f5]" />
            </div>
            <span className="text-xl font-bold text-[#2d2a26]">CraftNotes</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/features">
              <Button variant="ghost" className="text-[#6b6560] hover:text-[#2d2a26] hover:bg-[#f0ebe5]">
                Features
              </Button>
            </Link>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-[#6b6560] hover:text-[#2d2a26] hover:bg-[#f0ebe5]">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-[#2d2a26] text-[#faf8f5] hover:bg-[#1a1815] rounded-full px-6">
                  Get Started
                </Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-[#6b6560] hover:text-[#2d2a26] hover:bg-[#f0ebe5]">
                  Dashboard
                </Button>
              </Link>
              <SignOutButton>
                <Button variant="outline" className="border-[#2d2a26] text-[#2d2a26] hover:bg-[#f0ebe5] rounded-full px-6">
                  Sign Out
                </Button>
              </SignOutButton>
            </Show>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-20 pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#e8e4df] mb-8">
              <Sparkles className="w-4 h-4 text-[#d4a574]" />
              <span className="text-sm text-[#6b6560]">See it in action</span>
            </div>
            <h1 
              className="text-5xl md:text-7xl font-bold text-[#2d2a26] mb-6 leading-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Your Ideas, Organized
            </h1>
            <p className="text-xl md:text-2xl text-[#6b6560] max-w-2xl mx-auto mb-10 leading-relaxed">
              See how CraftNotes transforms your scattered thoughts 
              into beautifully organized brilliance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid Showcase */}
      <section className="relative z-20 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold text-[#2d2a26] mb-4"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              A Place for Everything
            </h2>
            <p className="text-lg text-[#6b6560] max-w-2xl mx-auto">
              From quick thoughts to detailed projects, CraftNotes adapts to your workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Column 1 */}
            <div className="space-y-6 md:mt-12">
              <MockNote
                title="Project Ideas"
                content="Brainstorming session for the new marketing campaign. Key themes: authenticity, growth, connection..."
                tags={["work", "ideas"]}
                delay={0}
              />
              <MockNote
                title="Meeting Notes"
                content="Q4 planning discussion. Action items: finalize budget, schedule team retreat..."
                tags={["meeting", "work"]}
                delay={0.2}
              />
              <MockNote
                title="Book Quotes"
                content="The only way to do great work is to love what you do. - Steve Jobs"
                tags={["inspiration", "quotes"]}
                delay={0.4}
              />
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <MockNote
                title="Creative Writing"
                content="The old house stood at the edge of the cliff, its windows like eyes watching the sea..."
                tags={["writing", "creative"]}
                delay={0.1}
              />
              <MockNote
                title="Recipe Collection"
                content="Grandma's secret apple pie recipe. Ingredients: 6 apples, 1 cup sugar, cinnamon..."
                tags={["recipes", "personal"]}
                delay={0.3}
              />
              <MockNote
                title="Travel Plans"
                content="Kyoto itinerary: Day 1 - Fushimi Inari shrine, Day 2 - Arashiyama bamboo grove..."
                tags={["travel", "plans"]}
                delay={0.5}
              />
              <MockNote
                title="Daily Journal"
                content="Today was productive. Finished the presentation and went for a long walk..."
                tags={["journal", "personal"]}
                delay={0.6}
              />
            </div>

            {/* Column 3 */}
            <div className="space-y-6 md:mt-8">
              <MockNote
                title="Learning Notes"
                content="TypeScript generics allow us to create reusable components that work with multiple types..."
                tags={["learning", "tech"]}
                delay={0.15}
              />
              <MockNote
                title="Book Summary"
                content="Atomic Habits by James Clear. Key insight: Small changes compound over time..."
                tags={["books", "summary"]}
                delay={0.35}
              />
              <MockNote
                title="Shopping List"
                content="Milk, eggs, bread, coffee beans, olive oil, fresh vegetables..."
                tags={["shopping", "list"]}
                delay={0.55}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="relative z-20 py-20 px-6 bg-white/30">
        <div className="max-w-6xl mx-auto space-y-24">
          {/* Feature 1: Smart Search */}
          <ShowcaseSection
            title="Find Anything Instantly"
            description="Powerful fuzzy search understands what you're looking for, even if you don't remember the exact words. Search across all your notes in milliseconds."
            icon={Search}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#e8e4df]">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-5 h-5 text-[#d4a574]" />
                <div className="flex-1 h-10 bg-[#faf8f5] rounded-lg flex items-center px-4 text-sm text-[#6b6560]">
                  project timeline
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4df]">
                  <p className="text-sm font-medium text-[#2d2a26]">Q4 Project Timeline</p>
                  <p className="text-xs text-[#8b8680] mt-1">Updated 2 days ago</p>
                </div>
                <div className="p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4df]">
                  <p className="text-sm font-medium text-[#2d2a26]">Website Redesign Project</p>
                  <p className="text-xs text-[#8b8680] mt-1">Updated 1 week ago</p>
                </div>
              </div>
            </div>
          </ShowcaseSection>

          {/* Feature 2: AI Assistant */}
          <ShowcaseSection
            title="AI at Your Fingertips"
            description="Ask questions about your notes, get summaries, or request help writing. Your personal AI assistant is always ready to help you think clearer and write better."
            icon={Bot}
            reverse
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#e8e4df]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#2d2a26] rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#faf8f5]" />
                </div>
                <span className="font-medium text-[#2d2a26]">AI Assistant</span>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#2d2a26] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-[#faf8f5]">U</span>
                  </div>
                  <div className="bg-[#2d2a26] text-[#faf8f5] rounded-2xl rounded-tl-sm px-4 py-2 text-sm max-w-[80%]">
                    Summarize my project notes
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-[#faf8f5] border border-[#e8e4df] rounded-2xl rounded-tr-sm px-4 py-2 text-sm max-w-[80%] text-[#2d2a26]">
                    Here's a summary of your 3 project notes: 1) Timeline established, 2) Budget approved, 3) Team assigned...
                  </div>
                  <div className="w-8 h-8 bg-[#d4a574] rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </ShowcaseSection>

          {/* Feature 3: Auto-save */}
          <ShowcaseSection
            title="Never Lose a Thought"
            description="Every keystroke is automatically saved. Your ideas are always preserved, even if you close your browser or lose connection. Work with peace of mind."
            icon={Zap}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#e8e4df]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#6b6560]" />
                  <span className="text-sm text-[#6b6560]">Creative Writing</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-[#6b9b7a] rounded-full"
                  />
                  <span className="text-xs text-[#8b8680]">Saved just now</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-[#faf8f5] rounded w-full" />
                <div className="h-4 bg-[#faf8f5] rounded w-[95%]" />
                <div className="h-4 bg-[#faf8f5] rounded w-[90%]" />
                <div className="h-4 bg-[#d4a574] rounded w-[40%] animate-pulse" />
              </div>
            </div>
          </ShowcaseSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-12 md:p-16 bg-[#2d2a26] rounded-3xl text-center overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#d4a574] rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#d4a574] rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 
                className="text-3xl md:text-4xl font-bold text-[#faf8f5] mb-4"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Ready to organize your ideas?
              </h2>
              <p className="text-lg text-[#a8a29e] mb-8 max-w-lg mx-auto">
                Join thousands of creators who trust CraftNotes for their thoughts.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SignUpButton mode="modal">
                  <Button 
                    size="lg" 
                    className="bg-[#faf8f5] text-[#2d2a26] hover:bg-[#e8e4df] rounded-full px-8 py-6 text-lg font-semibold group"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SignUpButton>
                <Link href="/features">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-[#faf8f5] text-[#faf8f5] hover:bg-[#faf8f5]/10 rounded-full px-8 py-6 text-lg"
                  >
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-12 px-6 border-t border-[#e8e4df]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2d2a26] rounded-lg flex items-center justify-center">
              <PenLine className="w-4 h-4 text-[#faf8f5]" />
            </div>
            <span className="font-semibold text-[#2d2a26]">CraftNotes</span>
          </div>
          <p className="text-sm text-[#8b8680]">
            © 2025 CraftNotes. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-[#6b6560] hover:text-[#2d2a26] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-[#6b6560] hover:text-[#2d2a26] transition-colors">Terms</Link>
            <Link href="/features" className="text-sm text-[#6b6560] hover:text-[#2d2a26] transition-colors">Features</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
