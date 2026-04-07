"use client"

import { motion } from "motion/react"
import { SignInButton, SignUpButton, Show, SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  PenLine, 
  ArrowLeft,
  FileText,
  Search,
  Tag,
  Zap,
  Share2,
  Shield,
  Sparkles,
  Bot,
  Clock,
  Cloud,
  Smartphone,
  Palette,
  Keyboard,
  ArrowRight
} from "lucide-react"

// Feature card component
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
      <div className="relative p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#e8e4df] shadow-sm hover:shadow-xl transition-all duration-500 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0eb] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="w-14 h-14 bg-[#2d2a26] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-7 h-7 text-[#faf8f5]" />
          </div>
          <h3 className="text-xl font-semibold text-[#2d2a26] mb-3">{title}</h3>
          <p className="text-[#6b6560] leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Section header component
function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-16"
    >
      <h2 
        className="text-3xl md:text-4xl font-bold text-[#2d2a26] mb-4"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {title}
      </h2>
      <p className="text-lg text-[#6b6560] max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
  )
}

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-[#faf8f5] overflow-hidden">
      {/* Background gradient orbs */}
      <motion.div
        className="absolute w-[700px] h-[700px] bg-[#e6d5c3] rounded-full blur-3xl opacity-25 top-[-300px] right-[-300px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] bg-[#d4e4d4] rounded-full blur-3xl opacity-20 bottom-[-200px] left-[-200px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
            <Link href="/showcase">
              <Button variant="ghost" className="text-[#6b6560] hover:text-[#2d2a26] hover:bg-[#f0ebe5]">
                Showcase
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
              <span className="text-sm text-[#6b6560]">Everything you need</span>
            </div>
            <h1 
              className="text-5xl md:text-7xl font-bold text-[#2d2a26] mb-6 leading-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Powerful Features
            </h1>
            <p className="text-xl md:text-2xl text-[#6b6560] max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover all the tools and capabilities that make CraftNotes 
              the perfect place for your ideas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Show when="signed-out">
                <SignUpButton mode="modal">
                  <Button 
                    size="lg" 
                    className="bg-[#2d2a26] text-[#faf8f5] hover:bg-[#1a1815] rounded-full px-8 py-6 text-lg group"
                  >
                    Start Creating Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SignUpButton>
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
              </Show>
              <Link href="/showcase">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#2d2a26] text-[#2d2a26] hover:bg-[#f0ebe5] rounded-full px-8 py-6 text-lg"
                >
                  See it in Action
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="relative z-20 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Core Features"
            subtitle="Everything you need to capture, organize, and develop your ideas."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={FileText}
              title="Rich Text Notes"
              description="Create beautiful notes with rich formatting, images, and embedded content. Write freely with a distraction-free interface."
              delay={0}
            />
            <FeatureCard
              icon={Search}
              title="Smart Search"
              description="Find anything instantly with powerful search across all your notes. Our fuzzy search understands what you're looking for."
              delay={0.1}
            />
            <FeatureCard
              icon={Tag}
              title="Organize with Tags"
              description="Keep notes organized with flexible tagging and nested collections. Create your own system that works for you."
              delay={0.2}
            />
            <FeatureCard
              icon={Zap}
              title="Auto-Save"
              description="Never lose your work with automatic saving. Every keystroke is preserved without you lifting a finger."
              delay={0.3}
            />
            <FeatureCard
              icon={Share2}
              title="Easy Sharing"
              description="Share individual notes or entire collections with others. Collaborate in real-time or share read-only links."
              delay={0.4}
            />
            <FeatureCard
              icon={Shield}
              title="Secure & Private"
              description="Your notes are encrypted and secure. Only you control your data. We never sell or share your information."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="relative z-20 py-20 px-6 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="AI-Powered Features"
            subtitle="Let artificial intelligence enhance your creative process."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Bot}
              title="AI Assistant"
              description="Ask questions about your notes, get summaries, or request help writing. Your personal AI is always ready to help."
              delay={0}
            />
            <FeatureCard
              icon={Sparkles}
              title="Smart Suggestions"
              description="Get intelligent suggestions as you write. AI helps you expand ideas, improve clarity, and catch errors."
              delay={0.1}
            />
            <FeatureCard
              icon={Clock}
              title="Quick Summaries"
              description="Generate summaries of long notes instantly. Perfect for reviewing meeting notes or research."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="relative z-20 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Works Everywhere"
            subtitle="Access your notes from any device, anywhere in the world."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Cloud}
              title="Cloud Sync"
              description="Your notes sync automatically across all devices. Start writing on your phone, finish on your laptop."
              delay={0}
            />
            <FeatureCard
              icon={Smartphone}
              title="Mobile Ready"
              description="Fully responsive design works perfectly on phones and tablets. Your pocket notebook, everywhere."
              delay={0.1}
            />
            <FeatureCard
              icon={Palette}
              title="Beautiful Design"
              description="A thoughtfully crafted interface that makes writing a pleasure. Focus on your words, not the tools."
              delay={0.2}
            />
            <FeatureCard
              icon={Keyboard}
              title="Keyboard Shortcuts"
              description="Power users love our extensive keyboard shortcuts. Navigate, create, and edit without touching your mouse."
              delay={0.3}
            />
            <FeatureCard
              icon={Clock}
              title="Version History"
              description="Never worry about losing work. Access previous versions of any note and restore with one click."
              delay={0.4}
            />
            <FeatureCard
              icon={Cloud}
              title="Offline Support"
              description="Keep working even without internet. Your changes sync automatically when you're back online."
              delay={0.5}
            />
          </div>
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
                Ready to experience it all?
              </h2>
              <p className="text-lg text-[#a8a29e] mb-8 max-w-lg mx-auto">
                Join thousands of creators who trust CraftNotes for their ideas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Show when="signed-out">
                  <SignUpButton mode="modal">
                    <Button 
                      size="lg" 
                      className="bg-[#faf8f5] text-[#2d2a26] hover:bg-[#e8e4df] rounded-full px-8 py-6 text-lg font-semibold group"
                    >
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <Link href="/dashboard">
                    <Button 
                      size="lg" 
                      className="bg-[#faf8f5] text-[#2d2a26] hover:bg-[#e8e4df] rounded-full px-8 py-6 text-lg font-semibold group"
                    >
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </Show>
                <Link href="/showcase">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-[#faf8f5] text-[#faf8f5] hover:bg-[#faf8f5]/10 rounded-full px-8 py-6 text-lg"
                  >
                    View Showcase
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
