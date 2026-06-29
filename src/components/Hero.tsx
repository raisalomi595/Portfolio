import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { useScrollTo } from '../hooks/useScrollTo'
import PlaidBackground from './PlaidBackground'
import RetroComputer from './RetroComputer'

export default function Hero() {
  const scrollTo = useScrollTo()
  const { scrollY } = useScroll()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-cream-100 scroll-mt-20"
    >
      <PlaidBackground />

      <div className="relative z-10 w-full min-h-screen flex items-start sm:items-center px-6 md:px-10 pt-24 sm:pt-0">
        <div className="mx-auto flex w-full max-w-8xl flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Intro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium uppercase tracking-widest text-terracotta-500 mb-4"
            >
              Available For Work &amp; Nepal
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-ink-800 leading-[1.05]"
            >
              Web<br />
              <span className="text-terracotta-500">Developer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-muted max-w-lg leading-relaxed"
            >
              I build accessible, performant web experiences. React ecosystems,
              design systems, and full-stack TypeScript.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="rounded-full bg-terracotta-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-terracotta-500/20 transition-all hover:bg-terracotta-600 hover:shadow-xl hover:shadow-terracotta-500/30 cursor-pointer"
              >
                View my work
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="rounded-full border border-ink-800/30 bg-white/60 px-6 py-3 text-sm font-semibold text-ink-800 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md hover:border-ink-800/50 cursor-pointer"
              >
                Get in touch
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex items-center gap-4 text-muted"
            >
              <a href="https://github.com/raisalomi595" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-ink-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/salomi-rai-923259400/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-ink-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="mailto:raisalomi595@gmail.com" aria-label="Email" className="transition-colors hover:text-ink-800">
                <Mail size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Retro Computer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-[270px] lg:max-w-[300px] flex-shrink-0 translate-y-6 lg:translate-y-8"
          >
            <RetroComputer />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: useTransform(scrollY, [0, 300], [1, 0]) }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted z-20"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
