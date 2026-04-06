"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import { SignInButton, SignUpButton, Show, SignOutButton, UserButton } from "@clerk/nextjs"
import { 
  PenLine, 
  Sparkles, 
  Zap, 
  Shield, 
  ArrowRight,
  ChevronDown,
  FileText,
  Search,
  Tag,
  Share2
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Animated floating paper particles
function FloatingPaper({ delay = 0, x, y, rotate }: { delay?: number; x: string; y: string; rotate: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 20, rotate: rotate - 10 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        y: [0, -30, 0],
        rotate: [rotate, rotate + 5, rotate]
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-16 h-20 bg-[#faf8f5] rounded-sm shadow-lg border border-[#e8e4df] relative">
        <div className="absolute top-3 left-2 right-2 h-1 bg-[#d4cec5] rounded-full" />
        <div className="absolute top-6 left-2 right-4 h-1 bg-[#e8e4df] rounded-full" />
        <div className="absolute top-9 left-2 right-3 h-1 bg-[#e8e4df] rounded-full" />
        <div className="absolute top-12 left-2 right-5 h-1 bg-[#e8e4df] rounded-full" />
      </div>
    </motion.div>
  )
}

// Animated gradient orb
function GradientOrb({ className }: { className?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// Feature card with hover animation
function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: React.ElementType
  title: string
  description: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="relative p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#e8e4df] shadow-sm hover:shadow-xl transition-shadow duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="w-12 h-12 bg-[#2d2a26] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-6 h-6 text-[#faf8f5]" />
          </div>
          <h3 className="text-xl font-semibold text-[#2d2a26] mb-2">{title}</h3>
          <p className="text-[#6b6560] leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Mock note card for visual showcase
function MockNote({ title, content, tags, delay = 0 }: { title: string; content: string; tags: string[]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, rotate: 1, transition: { duration: 0.3 } }}
      className="bg-[#faf8f5] rounded-xl p-5 shadow-lg border border-[#e8e4df] cursor-pointer"
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

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const heroY = useTransform(smoothScrollProgress, [0, 0.3], [0, 100])
  const heroOpacity = useTransform(smoothScrollProgress, [0, 0.3], [1, 0])
  const featuresY = useTransform(smoothScrollProgress, [0.1, 0.4], [50, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#faf8f5] overflow-x-hidden">
      {/* Custom cursor follower */}
      <motion.div
        className="fixed w-4 h-4 bg-[#d4a574] rounded-full pointer-events-none z-50 mix-blend-multiply hidden md:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Background gradient orbs */}
      <GradientOrb className="w-[600px] h-[600px] bg-[#e6d5c3] top-[-200px] left-[-200px]" />
      <GradientOrb className="w-[500px] h-[500px] bg-[#d4e4d4] top-[20%] right-[-150px]" />
      <GradientOrb className="w-[400px] h-[400px] bg-[#f0d4d4] bottom-[20%] left-[10%]" />

      {/* Noise texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#2d2a26] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <PenLine className="w-5 h-5 text-[#faf8f5]" />
            </div>
            <span className="text-xl font-bold text-[#2d2a26]">CraftNotes</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-[#6b6560] hover:text-[#2d2a26] transition-colors">Features</Link>
            <Link href="/showcase" className="text-[#6b6560] hover:text-[#2d2a26] transition-colors">Showcase</Link>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-[#2d2a26] hover:bg-[#f0ebe5]">
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
                <Button variant="ghost" className="text-[#2d2a26] hover:bg-[#f0ebe5]">
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
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        {/* Floating paper elements */}
        <FloatingPaper delay={0} x="10%" y="20%" rotate={-15} />
        <FloatingPaper delay={1.5} x="85%" y="30%" rotate={10} />
        <FloatingPaper delay={3} x="75%" y="70%" rotate={-8} />
        <FloatingPaper delay={2} x="15%" y="65%" rotate={20} />

        <div className="max-w-5xl mx-auto text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#e8e4df] mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#d4a574]" />
            <span className="text-sm text-[#6b6560]">AI-powered note taking</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#2d2a26] mb-6 leading-[0.95] tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Capture
            <br />
            <span className="text-[#8b8680]">Create</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-[#6b6560] max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A beautiful space to capture ideas, organize thoughts, and let your creativity flow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <Button 
                  size="lg" 
                  className="bg-[#2d2a26] text-[#faf8f5] hover:bg-[#1a1815] rounded-full px-8 py-6 text-lg group"
                >
                  Start Creating
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#2d2a26] text-[#2d2a26] hover:bg-[#f0ebe5] rounded-full px-8 py-6 text-lg"
                >
                  Sign In
                </Button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-[#2d2a26] text-[#faf8f5] hover:bg-[#1a1815] rounded-full px-8 py-6 text-lg group"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <SignOutButton>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#2d2a26] text-[#2d2a26] hover:bg-[#f0ebe5] rounded-full px-8 py-6 text-lg"
                >
                  Sign Out
                </Button>
              </SignOutButton>
            </Show>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-[#8b8680]"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6">
        <motion.div 
          style={{ y: featuresY }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h2 
              className="text-4xl md:text-6xl font-bold text-[#2d2a26] mb-6"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Everything you need
            </h2>
            <p className="text-xl text-[#6b6560] max-w-2xl mx-auto">
              Powerful features designed for the way you think and create.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={FileText}
              title="Rich Notes"
              description="Create beautiful notes with rich formatting, images, and embedded content."
              delay={0}
            />
            <FeatureCard
              icon={Search}
              title="Smart Search"
              description="Find anything instantly with powerful search across all your notes."
              delay={0.1}
            />
            <FeatureCard
              icon={Tag}
              title="Organize with Tags"
              description="Keep notes organized with flexible tagging and nested collections."
              delay={0.2}
            />
            <FeatureCard
              icon={Zap}
              title="AI-Powered"
              description="Get suggestions, summaries, and insights powered by artificial intelligence."
              delay={0.3}
            />
            <FeatureCard
              icon={Share2}
              title="Collaborate"
              description="Share notes and collaborate with others in real-time."
              delay={0.4}
            />
            <FeatureCard
              icon={Shield}
              title="Secure & Private"
              description="Your notes are encrypted and secure. Only you control your data."
              delay={0.5}
            />
          </div>
        </motion.div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h2 
              className="text-4xl md:text-6xl font-bold text-[#2d2a26] mb-6"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Your ideas, organized
            </h2>
            <p className="text-xl text-[#6b6560] max-w-2xl mx-auto">
              See how CraftNotes transforms your scattered thoughts into organized brilliance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
            </div>
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
            </div>
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-12 md:p-20 bg-[#2d2a26] rounded-3xl text-center overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#d4a574] rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#d4a574] rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 
                className="text-4xl md:text-6xl font-bold text-[#faf8f5] mb-6"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Ready to start creating?
              </h2>
              <p className="text-xl text-[#a8a29e] mb-10 max-w-xl mx-auto">
                Join thousands of creators who trust CraftNotes for their ideas.
              </p>
              <Link href="/get-started">
                <Button 
                  size="lg" 
                  className="bg-[#faf8f5] text-[#2d2a26] hover:bg-[#e8e4df] rounded-full px-10 py-7 text-lg font-semibold group"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-[#e8e4df]">
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
            <a href="mailto:hello@craftnotes.app" className="text-sm text-[#6b6560] hover:text-[#2d2a26] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
