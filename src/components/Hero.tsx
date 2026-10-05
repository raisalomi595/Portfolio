import { m, useReducedMotion } from 'framer-motion'
import { useScrollTo } from '../hooks/useScrollTo'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const navLinks = [
  { label: 'About', target: 'about' },
  { label: 'Work', target: 'work' },
  { label: 'Experiences', target: 'experiences' },
  { label: 'Gallery', target: 'gallery' },
  { label: 'Resume', target: 'resume' },
  { label: 'Contact me', target: 'contact' },
]

function Asterisk({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        <path d="M20 4v32" />
        <path d="M6.1 12l27.8 16" />
        <path d="M6.1 28l27.8-16" />
      </g>
    </svg>
  )
}

export default function Hero() {
  const scrollTo = useScrollTo()
  const reduce = useReducedMotion()

  return (
    <section id="hero" className="bg-paper pt-11 pb-0">
      {/* Brand mark */}
      <m.div
        initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -60 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
        className="flex justify-center"
      >
        <Asterisk className="h-8 w-8 text-ink" />
      </m.div>

      {/* Masthead — grows from a small centred mark into the full-bleed headline */}
      <div className="relative mt-6 overflow-hidden px-2.5">
        <m.h1
          initial={reduce ? false : { opacity: 0, scale: 0.3, color: '#B5B5B5' }}
          animate={{ opacity: 1, scale: 1, color: '#0A0A0A' }}
          transition={{ duration: 1.25, delay: 0.15, ease: EASE }}
          className="display-line text-center text-[22.4vw]"
        >
          Salomi Rai
        </m.h1>

        <m.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15, ease: EASE }}
          className="absolute left-1/2 top-[57%] z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="inline-block rounded-full bg-white px-6 py-3 text-[15px] font-normal leading-none text-ink shadow-[0_3px_16px_rgba(0,0,0,0.16)]">
            Web Developer
          </span>
        </m.div>
      </div>

      {/* Nav row */}
      <nav
        aria-label="Main navigation"
        className="mt-[74px] flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-[6.5%] md:justify-between"
      >
        {navLinks.map((link, i) => (
          <m.button
            key={link.target}
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 + i * 0.09, ease: EASE }}
            onClick={() => scrollTo(link.target)}
            className="cursor-pointer text-[15px] leading-none text-ink transition-opacity duration-200 hover:opacity-55"
          >
            {link.label}
          </m.button>
        ))}
      </nav>

      {/* Full-bleed hero image */}
      <m.div
        initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.1, delay: 1.05, ease: EASE }}
        className="mt-[58px] px-2.5"
      >
        <div className="aspect-[3/2] w-full overflow-hidden md:aspect-[1424/556]">
          <img
            src="/About.jpeg"
            alt="Salomi Rai"
            fetchPriority="high"
            draggable={false}
            className="h-full w-full select-none object-cover object-[50%_32%]"
          />
        </div>
      </m.div>
    </section>
  )
}
