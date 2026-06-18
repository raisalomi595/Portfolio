import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { useScrollTo } from '../hooks/useScrollTo'
import PlaidBackground from './PlaidBackground'
import RetroComputer from './RetroComputer'

export default function Hero() {
  const scrollTo = useScrollTo()
  const { scrollY } = useScroll()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream-100">
      <PlaidBackground />

      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-10">
        {/* Intro — bottom-left */}
        <motion.div
          className="max-w-lg self-end pb-20"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium uppercase tracking-widest text-terracotta-500 mb-3"
          >
            Available For Work &amp; Nepal
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-5xl md:text-8xl font-bold tracking-tight text-ink-800 leading-[1.1]"
          >
            Web{' '}
            <span className="text-terracotta-500">Developer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base text-muted max-w-md leading-relaxed"
          >
            I build accessible, performant web experiences. React ecosystems,
            design systems, and full-stack TypeScript.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex items-center gap-3"
          >
            <button
              onClick={() => scrollTo('projects')}
              className="rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-terracotta-600 cursor-pointer"
            >
              View my work
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="rounded-full border border-ink-800 px-5 py-2.5 text-sm font-semibold text-ink-800 transition-all hover:bg-ink-800 hover:text-cream-100 cursor-pointer"
            >
              Get in touch
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 flex items-center gap-4 text-muted"
          >
            <a href="https://github.com/raisalomi595" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-ink-800">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/salomi-rai-923259400/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-ink-800">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="mailto:raisalomi595@gmail.com" aria-label="Email" className="transition-colors hover:text-ink-800">
              <Mail size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* Retro Computer — right side */}
        <div className="hidden lg:flex w-[58%] max-w-[750px] self-center items-center justify-center">
          <RetroComputer />
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
