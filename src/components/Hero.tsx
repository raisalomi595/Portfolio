import {
  m,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useInView,
} from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useRef, type MouseEvent } from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import PlaidBackground from './PlaidBackground'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const barItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

function Bee() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-10 w-10 text-ink/60"
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

function SplitChars({
  text,
  delay,
  outline = false,
  stroke = '#1E1C18',
}: {
  text: string
  delay: number
  outline?: boolean
  stroke?: string
}) {
  return (
    <m.span
      className="whitespace-nowrap"
      initial={{ opacity: 0.35, letterSpacing: '0.08em' }}
      animate={{ opacity: 1, letterSpacing: '-0.02em' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {text.split('').map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
          <m.span
            className="inline-block will-change-transform"
            style={outline ? { WebkitTextStroke: `2px ${stroke}`, color: 'transparent' } : undefined}
            initial={{ y: '115%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, delay: delay + i * 0.05, ease: EASE }}
          >
            {ch}
          </m.span>
        </span>
      ))}
    </m.span>
  )
}

const chips = [
  { label: 'UI/UX Design', pos: 'left-[3%] top-[30%] md:left-[4%] md:top-[28%]', depth: 32, delay: 0.5, dur: 4.5, amp: 3 },
  { label: 'Prototyping', pos: 'left-[3%] bottom-[30%] md:left-[7%] md:bottom-[26%]', depth: 36, delay: 0.65, dur: 5.2, amp: 4 },
  { label: 'React', pos: 'right-[3%] top-[26%] md:right-[17%] md:top-[16%]', depth: 30, delay: 0.8, dur: 4.8, amp: 2 },
  { label: 'Figma', pos: 'right-[3%] bottom-[34%] md:right-[7%] md:bottom-[28%]', depth: 34, delay: 0.95, dur: 5.7, amp: 3 },
]

function FloatChip({
  label,
  pos,
  depth,
  delay,
  dur,
  amp,
  alive,
  sx,
  sy,
}: {
  label: string
  pos: string
  depth: number
  delay: number
  dur: number
  amp: number
  alive: boolean
  sx: ReturnType<typeof useSpring>
  sy: ReturnType<typeof useSpring>
}) {
  const x = useTransform(sx, (v: number) => v * depth)
  const y = useTransform(sy, (v: number) => v * depth)
  const magX = useMotionValue(0)
  const magY = useMotionValue(0)
  const smx = useSpring(magX, { stiffness: 260, damping: 20 })
  const smy = useSpring(magY, { stiffness: 260, damping: 20 })

  const onChipMove = (e: MouseEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    magX.set(((e.clientX - r.left) / r.width - 0.5) * 12)
    magY.set(((e.clientY - r.top) / r.height - 0.5) * 12)
  }
  const onChipLeave = () => {
    magX.set(0)
    magY.set(0)
  }

  return (
    <m.div style={{ x, y }} className={`pointer-events-auto absolute z-20 ${pos}`}>
      <m.div
        initial={{ opacity: 0, y: 15, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        <m.div
          animate={alive ? { y: [0, -amp, 0] } : { y: 0 }}
          transition={{ repeat: Infinity, duration: dur, ease: 'easeInOut', delay }}
        >
          <m.span
            style={{ x: smx, y: smy }}
            onMouseMove={onChipMove}
            onMouseLeave={onChipLeave}
            className="group inline-flex cursor-default items-center gap-2 border border-ink/25 bg-paper/85 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:border-terracotta hover:text-terracotta-deep md:px-4 md:py-2 md:text-[10px]"
          >
            <span className="size-1.5 bg-terracotta transition-transform duration-300 group-hover:scale-[1.4]" />
            <span className="inline-block transition-transform duration-300 group-hover:scale-[1.06]">
              {label}
            </span>
          </m.span>
        </m.div>
      </m.div>
    </m.div>
  )
}

export default function Hero() {
  const scrollTo = useScrollTo()
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement | null>(null)
  const inView = useInView(heroRef, { amount: 0 })
  const alive = inView && !reduce
  const { scrollY } = useScroll()

  // Scroll choreography — layers exit at different depths
  const backY = useTransform(scrollY, [0, 700], [0, -120])
  const backOpacity = useTransform(scrollY, [0, 550], [1, 0])
  const frontY = useTransform(scrollY, [0, 700], [0, -60])
  const stageY = useTransform(scrollY, [0, 700], [0, 110])
  const stageOpacity = useTransform(scrollY, [0, 500], [1, 0.25])
  const layerOutY = useTransform(scrollY, [0, 400], [0, 40])
  const layerOutOpacity = useTransform(scrollY, [0, 350], [1, 0])
  const barOpacity = useTransform(scrollY, [0, 250], [1, 0])
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const bgFade = useTransform(scrollY, [0, 700], [1, 0.35])

  // Shared cursor field — springs interpolate, never re-render
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 60, damping: 20 })
  const smy = useSpring(my, { stiffness: 60, damping: 20 })

  // Layer depths (max px at full deflection)
  const backX = useTransform(smx, (v) => v * 10)
  const frontX = useTransform(smx, (v) => v * 16)
  const scriptX = useTransform(smx, (v) => v * 20)
  const scriptY = useTransform(smy, (v) => v * 20)
  const portraitX = useTransform(smx, (v) => v * 28)
  const portraitY = useTransform(smy, (v) => v * 28)
  const badgeX = useTransform(smx, (v) => v * 24)
  const badgeY = useTransform(smy, (v) => v * 24)

  // Portrait tilt (local, 2–3deg max)
  const trx = useMotionValue(0)
  const try_ = useMotionValue(0)
  const tiltX = useSpring(trx, { stiffness: 180, damping: 22 })
  const tiltY = useSpring(try_, { stiffness: 180, damping: 22 })

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }
  const onPortraitMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 5)
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 5)
  }
  const onPortraitLeave = () => {
    trx.set(0)
    try_.set(0)
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-svh flex-col overflow-hidden bg-honey-blush text-ink scroll-mt-20"
    >
      <PlaidBackground mx={smx} my={smy} fade={bgFade} />

      <div className="relative z-10 flex flex-1 flex-col px-2 sm:px-4 md:px-6 pt-24 md:pt-28 pb-6">
        {/* Running head */}
        <div className="flex items-center justify-between gap-4">
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-ink/70 sm:text-[11px]"
          >
            <span className="inline-block size-1.5 bg-terracotta" />
            Designer &amp; Developer
          </m.p>

          {/* Printed "open to work" stamp */}
          <m.div
            initial={{ opacity: 0, y: 15, scale: 0.96, rotate: -3 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -3 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="hidden items-center gap-2.5 border-2 border-terracotta px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-ink sm:inline-flex"
          >
            <span className="relative flex size-2">
              <m.span
                animate={alive ? { scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] } : undefined}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute inline-flex h-full w-full bg-terracotta"
              />
              <m.span
                animate={alive ? { scale: [1, 1.15, 1], opacity: [1, 0.7, 1] } : undefined}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="relative inline-flex size-2 bg-terracotta"
              />
            </span>
            Open to work
          </m.div>
        </div>

        {/* Stage — layered portrait composition */}
        <div className="relative my-2 min-h-[58vh] flex-1 md:min-h-[60vh]">
          {/* Warm glow behind portrait */}
          <m.div
            aria-hidden="true"
            animate={alive ? { opacity: [0.6, 0.9, 0.6] } : { opacity: 0.75 }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            className="absolute left-1/2 top-[46%] z-0 h-[72vmin] w-[72vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,123,99,0.28),transparent_65%)] blur-2xl"
          />

          {/* Back masthead — solid ink, floats behind the portrait */}
          <m.div
            aria-hidden="true"
            style={{ x: backX, y: backY, opacity: backOpacity }}
            className="pointer-events-none absolute inset-x-0 top-[2%] z-20 select-none text-center text-ink"
          >
            <span className="font-display text-[clamp(56px,17vw,110px)] font-semibold uppercase leading-[0.85] md:text-[clamp(72px,14vw,210px)]">
              <SplitChars text="SALOMI" delay={0.3} />
            </span>
          </m.div>

          {/* Portrait — the plate of the composition */}
          <m.div
            style={{ y: stageY, opacity: stageOpacity }}
            className="absolute bottom-0 left-1/2 z-[1] h-[96%] -translate-x-1/2"
          >
            <m.div style={{ x: portraitX, y: portraitY }} className="relative h-full">
              {/* Ground shadow */}
              <div
                aria-hidden="true"
                className="absolute -bottom-1 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-[100%] bg-ink/25 blur-2xl"
              />
              <div
                onMouseMove={onPortraitMove}
                onMouseLeave={onPortraitLeave}
                data-cursor="portrait"
                className="h-full [perspective:1000px]"
              >
                <m.div
                  style={{ rotateX: tiltX, rotateY: tiltY }}
                  whileHover={reduce ? undefined : { scale: 1.015 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative h-full"
                >
                  <m.div
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
                    className="h-full"
                  >
                    <m.div
                      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                      transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
                      className="h-full"
                    >
                      <m.div
                        animate={alive ? { y: [0, -4, 0] } : { y: 0 }}
                        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                        className="h-full"
                      >
                        <m.img
                          src="/hero-portrait.png"
                          alt="Portrait of Salomi Rai"
                          draggable={false}
                          fetchPriority="high"
                          className="h-full w-auto select-none object-contain drop-shadow-[0_24px_36px_rgba(30,28,24,0.3)]"
                        />
                      </m.div>
                    </m.div>
                  </m.div>
                </m.div>
              </div>
            </m.div>
          </m.div>

          {/* Front wordmark — outlined, sits in front of the plate */}
          <m.div
            aria-hidden="true"
            style={{ x: frontX, y: frontY }}
            className="pointer-events-none absolute inset-x-0 bottom-[9%] z-20 select-none text-center"
          >
            <span className="font-display text-[clamp(52px,15vw,64px)] font-semibold uppercase leading-[0.85] md:text-[clamp(64px,13vw,190px)]">
              <SplitChars text="RAI" delay={0.55} outline stroke="#FAF7F2" />
            </span>
          </m.div>

          {/* Italic connector */}
          <m.span
            aria-hidden="true"
            style={{ x: scriptX, y: scriptY }}
            className="absolute left-[8%] top-[46%] z-20 select-none md:left-[56%] md:top-[30%]"
          >
            <m.span
              initial={{ opacity: 0, y: 10, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
              className="block whitespace-nowrap font-body text-[clamp(26px,4vw,52px)] italic leading-none text-terracotta-deep"
            >
              web&nbsp;&amp;&nbsp;ui/ux
            </m.span>
          </m.span>

          {/* Floating layer — seal + marginalia tags drift out on scroll */}
          <m.div style={{ y: layerOutY, opacity: layerOutOpacity }} className="pointer-events-none absolute inset-0">
            {/* Printer's seal — scrolls to work */}
            <m.button
              onClick={() => scrollTo('projects')}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="View my work"
              className="group pointer-events-auto absolute right-[5%] top-[24%] z-20 hidden size-28 cursor-pointer place-items-center text-ink/75 sm:grid md:size-32"
            >
              <m.span style={{ x: badgeX, y: badgeY }} className="absolute inset-0 grid place-items-center">
                <svg
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                  className={`absolute inset-0 h-full w-full group-hover:[animation-duration:9s] ${alive ? 'animate-rotate-slow' : ''}`}
                >
                  <defs>
                    <path
                      id="hero-orbit"
                      d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                      fill="none"
                    />
                  </defs>
                  <text fontSize="8.5" letterSpacing="1.4" className="fill-current font-mono uppercase">
                    <textPath href="#hero-orbit">open to work • ui/ux • open to work •</textPath>
                  </text>
                </svg>
                <span className="grid size-11 place-items-center bg-ink text-paper transition-transform duration-300 group-hover:translate-y-1">
                  <ArrowDown size={16} />
                </span>
              </m.span>
            </m.button>

            {/* Floating marginalia tags */}
            {chips.map((chip) => (
              <FloatChip key={chip.label} {...chip} alive={alive} sx={smx} sy={smy} />
            ))}
          </m.div>
        </div>

        {/* Editorial bar — standfirst deck + actions */}
        <m.div style={{ opacity: barOpacity }}>
          <m.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.0 } } }}
            className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t border-ink/20 pt-5"
          >
            <m.p
              variants={barItem}
              className="max-w-[22ch] font-body text-xl italic leading-snug text-ink/85 sm:text-2xl md:max-w-[34ch] md:text-[28px]"
            >
              Web development, UI/UX &amp; atmospheres.
            </m.p>
            <m.div variants={barItem} className="flex flex-col items-end gap-2 sm:items-center sm:flex-row">
              <div className="order-first flex items-center gap-2 sm:order-none">
                <m.button
                  onClick={() => scrollTo('projects')}
                  whileHover={reduce ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-ink bg-ink px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-paper transition-colors duration-300 hover:border-terracotta hover:bg-terracotta-deep cursor-pointer"
                >
                  View my work
                </m.button>
                <m.button
                  onClick={() => scrollTo('contact')}
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-1.5 px-2 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/70 transition-colors hover:text-ink cursor-pointer"
                >
                  Get in touch
                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </m.button>
              </div>
              <Bee />
            </m.div>
          </m.div>
        </m.div>
      </div>

      {/* Scroll indicator */}
      <m.div
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-ink/70"
      >
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.4em]">
            Scroll
          </span>
          <m.div
            animate={alive ? { y: [0, 8, 0] } : { y: 0 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} />
          </m.div>
        </m.div>
      </m.div>
    </section>
  )
}
