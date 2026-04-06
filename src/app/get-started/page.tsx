"use client"

import { motion } from "motion/react"
import { SignInButton, SignUpButton, Show, SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  PenLine,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Gift,
  FileText,
  User,
  Mail
} from "lucide-react"

// Step card component
function StepCard({ 
  number,
  title, 
  description,
  icon: Icon,
  delay = 0
}: { 
  number: number
  title: string
  description: string
  icon: React.ElementType
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="flex gap-6">
        {/* Step number line */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-[#2d2a26] rounded-full flex items-center justify-center text-[#faf8f5] font-bold text-lg">
            {number}
          </div>
          <div className="w-0.5 flex-1 bg-[#e8e4df] mt-4" />
        </div>
        
        {/* Content */}
        <div className="flex-1 pb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#e8e4df] shadow-sm">
            <div className="w-12 h-12 bg-[#d4a574]/10 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-[#d4a574]" />
            </div>
            <h3 className="text-xl font-semibold text-[#2d2a26] mb-2">{title}</h3>
            <p className="text-[#6b6560] leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Benefit item component
function BenefitItem({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3"
    >
      <div className="w-6 h-6 bg-[#6b9b7a]/10 rounded-full flex items-center justify-center">
        <CheckCircle className="w-4 h-4 text-[#6b9b7a]" />
      </div>
      <span className="text-[#2d2a26]">{text}</span>
    </motion.div>
  )
}

export default function GetStartedPage() {
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
            <Link href="/features">
              <Button variant="ghost" className="text-[#6b6560] hover:text-[#2d2a26] hover:bg-[#f0ebe5]">
                Features
              </Button>
            </Link>
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
      <section className="relative z-20 pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#e8e4df] mb-8">
              <Gift className="w-4 h-4 text-[#d4a574]" />
              <span className="text-sm text-[#6b6560]">Free forever</span>
            </div>
            <h1 
              className="text-5xl md:text-6xl font-bold text-[#2d2a26] mb-6 leading-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Start Your Creative Journey
            </h1>
            <p className="text-xl md:text-2xl text-[#6b6560] max-w-2xl mx-auto mb-8 leading-relaxed">
              Get started with CraftNotes in minutes. No credit card required, 
              no complicated setup—just your ideas, organized beautifully.
            </p>
            
            {/* Quick CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <SignUpButton mode="modal">
                <Button 
                  size="lg" 
                  className="bg-[#2d2a26] text-[#faf8f5] hover:bg-[#1a1815] rounded-full px-10 py-7 text-lg font-semibold group"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </SignUpButton>
              <Link href="/showcase">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#2d2a26] text-[#2d2a26] hover:bg-[#f0ebe5] rounded-full px-8 py-7 text-lg"
                >
                  See Examples
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="relative z-20 py-16 px-6">
        <div className="max-w-3xl mx-auto">
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
              Three Simple Steps
            </h2>
            <p className="text-lg text-[#6b6560]">
              From signup to your first note in under a minute
            </p>
          </motion.div>

          <div className="relative">
            <StepCard
              number={1}
              title="Create Your Account"
              description="Sign up with your email or use Google/GitHub for instant access. We only ask for what we need—no unnecessary questions."
              icon={User}
              delay={0}
            />
            <StepCard
              number={2}
              title="Get Your Welcome Note"
              description="We automatically create your first note with helpful tips to get you started. Or jump right in and create your own."
              icon={FileText}
              delay={0.15}
            />
            <StepCard
              number={3}
              title="Start Capturing Ideas"
              description="Begin writing immediately. Use the sidebar to organize, the search to find, and AI to enhance your thinking."
              icon={Sparkles}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="relative z-20 py-20 px-6 bg-white/30">
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
              What You Get
            </h2>
            <p className="text-lg text-[#6b6560] max-w-2xl mx-auto">
              Everything you need to capture and organize your thoughts, completely free
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Left column - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#e8e4df]"
            >
              <h3 className="text-xl font-semibold text-[#2d2a26] mb-6">Free Plan Includes:</h3>
              <div className="space-y-4">
                <BenefitItem text="Unlimited notes" delay={0} />
                <BenefitItem text="Auto-save & cloud sync" delay={0.1} />
                <BenefitItem text="Smart search" delay={0.2} />
                <BenefitItem text="AI assistant (50 messages/month)" delay={0.3} />
                <BenefitItem text="Tag organization" delay={0.4} />
                <BenefitItem text="Mobile responsive" delay={0.5} />
                <BenefitItem text="Export to Markdown" delay={0.6} />
                <BenefitItem text="Secure encryption" delay={0.7} />
              </div>
            </motion.div>

            {/* Right column - Stats/Trust */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#e8e4df]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#2d2a26] rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[#faf8f5]" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#2d2a26]">30 seconds</p>
                    <p className="text-[#6b6560]">Average setup time</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#e8e4df]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#6b9b7a]/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#6b9b7a]" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#2d2a26]">100% Secure</p>
                    <p className="text-[#6b6560]">End-to-end encryption</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#d4a574]/10 rounded-2xl p-8 border border-[#d4a574]/20">
                <p className="text-[#6b6560] mb-2">No credit card required</p>
                <p className="text-[#2d2a26] font-medium">Truly free. No hidden fees, no trials, no surprises.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="relative z-20 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 
              className="text-2xl md:text-3xl font-bold text-[#2d2a26] mb-4"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Have questions?
            </h3>
            <p className="text-[#6b6560] mb-6">
              We&apos;re here to help you get the most out of CraftNotes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:hello@craftnotes.app" 
                className="flex items-center gap-2 text-[#d4a574] hover:text-[#b8925f] transition-colors"
              >
                <Mail className="w-5 h-5" />
                hello@craftnotes.app
              </a>
              <span className="hidden sm:block text-[#e8e4df]">|</span>
              <Link href="/features" className="text-[#d4a574] hover:text-[#b8925f] transition-colors">
                Explore Features →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
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
                Ready to begin?
              </h2>
              <p className="text-lg text-[#a8a29e] mb-8 max-w-lg mx-auto">
                Join thousands of creators who trust CraftNotes for their ideas.
                It&apos;s free and takes less than a minute.
              </p>
              <SignUpButton mode="modal">
                <Button 
                  size="lg" 
                  className="bg-[#faf8f5] text-[#2d2a26] hover:bg-[#e8e4df] rounded-full px-10 py-7 text-lg font-semibold group"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </SignUpButton>
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
