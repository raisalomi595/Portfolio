import { m, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useScrollTo } from '../hooks/useScrollTo'
import PlaidBackground from './PlaidBackground'

function Bee() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-10 w-10 text-honey-espresso/60"
      aria-hidden="true"
    >
      <ellipse cx="27" cy="27" rx="9" ry="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M22.5 22.5l-1.5 9M27 22v10M31.5 22.5l-1.5 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M24 20c-1-3-4-4-6.5-2.5S14 22 16 23"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="32" cy="26" r="0.8" fill="currentColor" />
      <path d="M32 22l1.5-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export default function Hero() {
  const scrollTo = useScrollTo()
  const { scrollY } = useScroll()
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const wordmarkY = useTransform(scrollY, [0, 600], [0, -80])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden bg-honey-blush text-honey-espresso scroll-mt-20"
    >
      <PlaidBackground />

      <div className="relative z-10 flex flex-1 flex-col px-2 sm:px-4 md:px-6 pt-24 md:pt-28 pb-8">
        {/* Masthead / eyebrow */}
        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-noe flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-honey-espresso/70 sm:text-[11px]"
        >
          <span className="inline-block size-1.5 rounded-full bg-honey-accent" />
          Salomi Rai — Web Developer &amp; UI/UX Designer
        </m.p>

        {/* Giant wordmark */}
        <div className="relative my-auto min-h-[48vh] md:min-h-[44vh]">
          <m.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: wordmarkY }}
            className="font-display flex flex-col justify-between whitespace-nowrap leading-[0.88] uppercase tracking-[-0.01em] md:flex-row md:items-end"
          >
            <span className="text-[clamp(84px,17vw,250px)]">Salomi</span>
            <span className="text-[clamp(64px,13vw,190px)] self-end md:self-auto md:text-right text-honey-espresso/85">
              Rai
            </span>
          </m.h1>

          {/* Script connector, overlapping the gap */}
          <m.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            aria-hidden="true"
            className="font-script absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] select-none text-[clamp(26px,4.6vw,56px)] leading-none text-honey-accent"
          >
            web&nbsp;&amp;&nbsp;ui/ux
          </m.span>
        </div>

        {/* Editorial statements */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t border-honey-espresso/15 pt-5"
        >
          <p className="font-noe text-[10px] uppercase leading-relaxed tracking-[0.28em] text-honey-espresso/70 sm:text-xs">
            Web development
            <br />
            UI/UX &amp; atmospheres
          </p>
          <div className="flex flex-col items-end gap-2 sm:items-center sm:flex-row">
            <div className="order-first flex items-center gap-2 sm:order-none">
              <button
                onClick={() => scrollTo('projects')}
                className="rounded-sm border border-honey-espresso/25 bg-honey-cream/70 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-honey-espresso transition-all duration-500 ease-in-out hover:rounded-full hover:border-honey-accent hover:bg-honey-accent hover:text-white cursor-pointer"
              >
                View my work
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="group inline-flex items-center gap-1.5 px-2 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-honey-espresso/70 transition-colors hover:text-honey-accent cursor-pointer"
              >
                Get in touch
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
            <Bee />
          </div>
        </m.div>
      </div>

      {/* Scroll indicator */}
      <m.div
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-honey-espresso/45"
      >
        <span className="font-noe text-[9px] font-medium uppercase tracking-[0.4em]">
          Scroll
        </span>
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </m.div>
      </m.div>
    </section>
  )
}