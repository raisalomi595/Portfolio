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

function SplitChars({
  text,
  delay,
  outline = false,
  stroke = '#331917',
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
      animate={{ opacity: 1, letterSpacing: '-0.01em' }}
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
            className="group inline-flex cursor-default items-center gap-2 rounded-full border border-honey-espresso/20 bg-honey-cream/80 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.25em] text-honey-espresso shadow-[0_10px_24px_-12px_rgba(51,25,23,0.4)] backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-honey-espresso/45 hover:bg-honey-cream hover:shadow-[0_14px_28px_-12px_rgba(51,25,23,0.5)] md:px-4 md:py-2 md:text-[10px]"
          >
            <span className="size-1.5 rounded-full bg-honey-accent transition-transform duration-300 group-hover:scale-[1.4]" />
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
      className="relative flex min-h-svh flex-col overflow-hidden bg-honey-blush text-honey-espresso scroll-mt-20"
    >
      <PlaidBackground mx={smx} my={smy} fade={bgFade} />

      <div className="relative z-10 flex flex-1 flex-col px-2 sm:px-4 md:px-6 pt-24 md:pt-28 pb-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="font-noe flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-honey-espresso/70 sm:text-[11px]"
          >
            <span className="inline-block size-1.5 rounded-full bg-honey-accent" />
            Designer &amp; Developer
          </m.p>
          <m.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="hidden items-center gap-2.5 rounded-full border border-honey-espresso/20 bg-honey-cream/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-honey-espresso sm:inline-flex"
          >
            <span className="relative flex size-2">
              <m.span
                animate={alive ? { scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] } : undefined}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute inline-flex h-full w-full rounded-full bg-honey-accent"
              />
              <m.span
                animate={alive ? { scale: [1, 1.15, 1], opacity: [1, 0.7, 1] } : undefined}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="relative inline-flex size-2 rounded-full bg-honey-accent"
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

          {/* Back wordmark — floats over the portrait */}
          <m.div
            aria-hidden="true"
            style={{ x: backX, y: backY, opacity: backOpacity }}
            className="pointer-events-none absolute inset-x-0 top-[2%] z-20 select-none text-center"
          >
            <span className="font-display text-[clamp(56px,17vw,110px)] uppercase leading-[0.85] tracking-[-0.01em] drop-shadow-[0_2px_16px_rgba(245,227,214,0.5)] md:text-[clamp(72px,15vw,230px)]">
              <SplitChars text="SALOMI" delay={0.3} outline />
            </span>
          </m.div>

          {/* Portrait — the backdrop of the composition */}
          <m.div
            style={{ y: stageY, opacity: stageOpacity }}
            className="absolute bottom-0 left-1/2 z-[1] h-[96%] -translate-x-1/2"
          >
            <m.div style={{ x: portraitX, y: portraitY }} className="relative h-full">
              {/* Ground shadow */}
              <div
                aria-hidden="true"
                className="absolute -bottom-1 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-[100%] bg-honey-espresso/25 blur-2xl"
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
                          className="h-full w-auto select-none object-contain drop-shadow-[0_24px_36px_rgba(51,25,23,0.35)]"
                        />
                      </m.div>
                    </m.div>
                  </m.div>
                </m.div>
              </div>
            </m.div>
          </m.div>

          {/* Front outline wordmark */}
          <m.div
            aria-hidden="true"
            style={{ x: frontX, y: frontY }}
            className="pointer-events-none absolute inset-x-0 bottom-[9%] z-20 select-none text-center"
          >
            <span className="font-display text-[clamp(52px,15vw,64px)] uppercase leading-[0.85] drop-shadow-[0_2px_16px_rgba(51,25,23,0.55)] md:text-[clamp(64px,13vw,200px)]">
              <SplitChars text="RAI" delay={0.55} outline stroke="#F5E3D6" />
            </span>
          </m.div>

          {/* Script connector */}
          <m.span
            aria-hidden="true"
            style={{ x: scriptX, y: scriptY }}
            className="absolute left-[8%] top-[46%] z-20 select-none md:left-[56%] md:top-[30%]"
          >
            <m.span
              initial={{ opacity: 0, y: 10, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: -8 }}
              transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
              className="font-script block whitespace-nowrap text-[clamp(30px,4.6vw,60px)] leading-none text-honey-accent"
            >
              web&nbsp;&amp;&nbsp;ui/ux
            </m.span>
          </m.span>

          {/* Floating layer — badge + skill chips drift out on scroll */}
          <m.div style={{ y: layerOutY, opacity: layerOutOpacity }} className="pointer-events-none absolute inset-0">
            {/* Orbit badge — scrolls to work */}
            <m.button
              onClick={() => scrollTo('projects')}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="View my work"
              className="group pointer-events-auto absolute right-[5%] top-[24%] z-20 hidden size-28 cursor-pointer place-items-center text-honey-espresso/75 sm:grid md:size-32"
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
                  <text fontSize="9.5" letterSpacing="1.6" className="fill-current font-noe uppercase">
                    <textPath href="#hero-orbit">open to work • ui/ux • open to work •</textPath>
                  </text>
                </svg>
                <span className="grid size-11 place-items-center rounded-full bg-honey-espresso text-honey-cream transition-transform duration-300 group-hover:translate-y-1">
                  <ArrowDown size={16} />
                </span>
              </m.span>
            </m.button>

            {/* Floating skill chips */}
            {chips.map((chip) => (
              <FloatChip key={chip.label} {...chip} alive={alive} sx={smx} sy={smy} />
            ))}
          </m.div>
        </div>

        {/* Editorial bar */}
        <m.div style={{ opacity: barOpacity }}>
          <m.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.0 } } }}
            className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t border-honey-espresso/15 pt-5"
          >
            <m.p
              variants={barItem}
              className="font-noe text-[10px] uppercase leading-relaxed tracking-[0.28em] text-honey-espresso/70 sm:text-xs"
            >
              Web development
              <br />
              UI/UX &amp; atmospheres
            </m.p>
            <m.div variants={barItem} className="flex flex-col items-end gap-2 sm:items-center sm:flex-row">
              <div className="order-first flex items-center gap-2 sm:order-none">
                <m.button
                  onClick={() => scrollTo('projects')}
                  whileHover={reduce ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-sm border border-honey-espresso/25 bg-honey-cream/70 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-honey-espresso transition-[background-color,border-color,color,border-radius] duration-300 hover:rounded-full hover:border-honey-accent hover:bg-honey-accent hover:text-white cursor-pointer"
                >
                  View my work
                </m.button>
                <m.button
                  onClick={() => scrollTo('contact')}
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-1.5 px-2 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-honey-espresso/70 transition-colors hover:text-honey-accent cursor-pointer"
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
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-honey-espresso/45"
      >
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-noe text-[9px] font-medium uppercase tracking-[0.4em]">
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
