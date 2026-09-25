import { useRef, useEffect, type MouseEvent, type ReactNode } from 'react'
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { Mail, Award, PenTool, Code, Sparkles } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const skillsList = [
  'React.js',
  'TypeScript',
  'Tailwind CSS',
  'Java',
  'MySQL',
  'JavaScript',
  'HTML & CSS',
  'Git & GitHub',
]

const services = [
  {
    num: '01',
    title: 'Design',
    desc: 'UI/UX interfaces, wireframes & design systems with clarity at the core.',
    Icon: PenTool,
  },
  {
    num: '02',
    title: 'Develop',
    desc: 'Responsive React & TypeScript apps — motion and accessibility built in.',
    Icon: Code,
  },
  {
    num: '03',
    title: 'Level Up',
    desc: 'Currently improving backend development, database design & problem solving.',
    Icon: Sparkles,
  },
]

const bioStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const bioItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/* Static painter's-canvas texture behind the whole section */
function SectionCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Canvas weave — crosshatch threads
      const step = 16
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(139, 129, 116, 0.10)'
      for (let i = -h; i < w; i += step) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + h, h)
        ctx.stroke()
      }
      ctx.strokeStyle = 'rgba(139, 129, 116, 0.06)'
      for (let i = -h; i < w; i += step) {
        ctx.beginPath()
        ctx.moveTo(i + h, 0)
        ctx.lineTo(i, h)
        ctx.stroke()
      }

      // Static grain dots
      const grains = Math.floor((w * h) / 2600)
      for (let i = 0; i < grains; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        const r = 0.4 + Math.random() * 1.1
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 129, 116, ${0.04 + Math.random() * 0.08})`
        ctx.fill()
      }

      // Soft vignette
      const g = ctx.createRadialGradient(
        w / 2, h / 2, Math.min(w, h) * 0.25,
        w / 2, h / 2, Math.hypot(w, h) / 2
      )
      g.addColorStop(0, 'rgba(139,129,116,0)')
      g.addColorStop(1, 'rgba(139,129,116,0.13)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70 mix-blend-multiply"
    />
  )
}

/* Animated weave + grain over the photo (existing) */
function CanvasOverlay() {
  const ref = useRef<HTMLCanvasElement>(null)
  const hoverRef = useRef(0)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let time = 0

    const resize = () => {
      const parent = canvas.parentElement!
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseEnter = () => { hoverRef.current = 1 }
    const onMouseLeave = () => { hoverRef.current = 0 }
    canvas.addEventListener('mouseenter', onMouseEnter)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const draw = () => {
      time += 0.016
      const w = canvas.width
      const h = canvas.height
      const hover = hoverRef.current

      ctx.clearRect(0, 0, w, h)

      // Thick canvas weave texture
      const step = 10
      ctx.strokeStyle = 'rgba(139, 129, 116, 0.25)'
      ctx.lineWidth = 1.2
      for (let x = 0; x < w; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + step, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y + step)
        ctx.stroke()
      }

      // Cross-thread weave
      ctx.strokeStyle = 'rgba(139, 129, 116, 0.1)'
      ctx.lineWidth = 0.6
      for (let x = 0; x < w; x += step * 2) {
        ctx.beginPath()
        ctx.moveTo(x + step * 0.5, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      // Canvas grain dots
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        const r = 0.5 + Math.random() * 1.5
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 129, 116, ${0.05 + Math.random() * 0.1})`
        ctx.fill()
      }

      // Paint daub strokes
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        const r = 3 + Math.random() * 15
        const alpha = 0.02 + Math.random() * 0.04
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(30, 15%, 65%, ${alpha})`
        ctx.fill()
      }

      // Subtle vignette
      const grad = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.7)
      grad.addColorStop(0, 'rgba(0,0,0,0)')
      grad.addColorStop(1, 'rgba(0,0,0,0.12)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Animated film grain
      const grain = ctx.createImageData(w, h)
      for (let i = 0; i < grain.data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 20
        grain.data[i] = 128 + noise
        grain.data[i + 1] = 128 + noise
        grain.data[i + 2] = 128 + noise
        grain.data[i + 3] = 10
      }
      ctx.putImageData(grain, 0, 0)

      // Warp shift
      if (hover < 1) {
        const warp = ctx.getImageData(0, 0, w, h)
        const shift = Math.sin(time * 0.8) * 1.5
        ctx.putImageData(warp, shift, 0)
      }

      canvas.style.opacity = String(Math.max(0.85, 1 - hover * 0.7))
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mouseenter', onMouseEnter)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-auto mix-blend-multiply"
      aria-hidden="true"
    />
  )
}

function RevealLine({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
      <m.span
        className="block"
        initial={{ y: '130%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </m.span>
    </span>
  )
}

export default function About() {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), {
    stiffness: 140,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), {
    stiffness: 140,
    damping: 18,
  })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <section id="about" className="relative overflow-hidden bg-cream-50 py-24 md:py-32 scroll-mt-20">
      <SectionCanvas />

      <div className="relative z-10 mx-auto max-w-8xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Left: Photo */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <m.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            >
              <div
                className="[perspective:1200px]"
                onMouseMove={onMove}
                onMouseLeave={onLeave}
              >
                <m.div
                  style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                  className="relative"
                >
                  {/* Canvas background */}
                  <div className="absolute -inset-4 rounded-sm bg-[#E8DEC9] shadow-inner overflow-hidden">
                    <div className="w-full h-full opacity-30" style={{
                      backgroundImage: `
                        repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(139,129,116,0.15) 8px, rgba(139,129,116,0.15) 9px),
                        repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(139,129,116,0.15) 8px, rgba(139,129,116,0.15) 9px)
                      `
                    }} />
                  </div>
                  {/* Image container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-cream-200 shadow-lg">
                    <img
                      src="/About.jpeg"
                      alt="Salomi Rai"
                      className="h-full w-full object-cover"
                    />
                    <CanvasOverlay />
                  </div>
                  {/* Canvas frame border accents */}
                  <div className="absolute -inset-4 rounded-sm border-2 border-[#C9B896] pointer-events-none" />
                  <div className="absolute -inset-4 rounded-sm border border-white/20 pointer-events-none" />
                  {/* Editorial caption */}
                  <p className="mt-8 text-center font-hidden text-[11px] uppercase tracking-[0.28em] text-muted md:text-left">
                    Fig. 01 — Salomi Rai
                  </p>
                </m.div>
              </div>
            </m.div>
          </m.div>

          {/* Right: Bio */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-7 flex flex-col justify-center"
          >
            <p className="font-hidden text-sm uppercase tracking-[0.3em] text-terracotta-500 mb-5">
              About
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink-800 leading-[1.06]">
              <RevealLine delay={0.1}>Where logic</RevealLine>
              <RevealLine delay={0.28}>
                meets{' '}
                <em className="font-canora text-[1.1em] font-normal italic text-terracotta-500">
                  design
                </em>
                <span className="text-terracotta-500">.</span>
              </RevealLine>
            </h2>

            <m.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-1"
            >
              <span className="font-script text-3xl leading-none text-terracotta-600 md:text-4xl">
                Salomi Rai
              </span>
              <span className="font-hidden text-[11px] uppercase tracking-[0.28em] text-muted">
                UI/UX Developer · Frontend
              </span>
            </m.div>

            <m.div
              variants={bioStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-8 space-y-4 text-base text-muted leading-relaxed max-w-xl"
            >
              <m.p variants={bioItem}>
                I'm a Web Developer with a strong interest in building modern,
                responsive, and interactive web applications. I enjoy the space
                where{' '}
                <span className="font-canora text-[1.08em] italic text-terracotta-600">
                  logic meets design
                </span>{' '}
                — turning complex problems into simple, beautiful digital experiences.
              </m.p>
              <m.p variants={bioItem}>
                Currently expanding my knowledge of React, TypeScript, Java, and
                full-stack development. I believe in writing clean code,
                creating accessible interfaces, and continuously learning.
              </m.p>
              <m.p variants={bioItem}>
                I'm seeking opportunities to collaborate on meaningful projects,
                gain industry experience, and grow as a developer.
              </m.p>
            </m.div>

            {/* Skills */}
            <m.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
              }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {skillsList.map((skill) => (
                <m.span
                  key={skill}
                  variants={{
                    hidden: { opacity: 0, y: 10, scale: 0.94 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.5, ease: EASE },
                    },
                  }}
                  whileHover={{ y: -3, scale: 1.06 }}
                  className="cursor-default rounded-full border border-cream-300 bg-cream-100 px-3.5 py-1.5 text-[13px] font-medium text-ink-700 transition-colors hover:border-terracotta-500/50 hover:bg-cream-200 hover:text-terracotta-600"
                >
                  {skill}
                </m.span>
              ))}
            </m.div>

            {/* Certificates */}
            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-10"
            >
              <p className="font-hidden text-sm uppercase tracking-[0.3em] text-terracotta-500 mb-3">
                Certificates
              </p>
              <m.a
                href="/CertificateOfCompletion_Java%20ObjectOriented%20Programming.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="group relative block rounded-sm border border-cream-300 bg-cream-100/80 px-4 py-3 pr-12 transition-[background-color,border-color,box-shadow] hover:bg-cream-200 hover:border-terracotta-500/40 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-terracotta-500/10 text-terracotta-600 transition-colors group-hover:bg-terracotta-500 group-hover:text-white">
                    <Award size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink-800 transition-colors group-hover:text-terracotta-600">
                      Java Object-Oriented Programming (OOP)
                    </p>
                    <p className="mt-0.5 text-xs text-muted/70">
                      LinkedIn Learning
                    </p>
                  </div>
                </div>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/40 transition-colors group-hover:text-terracotta-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                </span>
              </m.a>
            </m.div>

            {/* Social links */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 flex items-center gap-5 text-muted"
            >
              <m.a
                href="https://github.com/raisalomi595"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ y: -3, scale: 1.15 }}
                className="transition-colors hover:text-ink-800"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </m.a>
              <m.a
                href="https://www.linkedin.com/in/salomi-rai-923259400/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ y: -3, scale: 1.15 }}
                className="transition-colors hover:text-ink-800"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </m.a>
              <m.a
                href="mailto:raisalomi595@gmail.com"
                aria-label="Email"
                whileHover={{ y: -3, scale: 1.15 }}
                className="transition-colors hover:text-ink-800"
              >
                <Mail size={18} />
              </m.a>
            </m.div>
          </m.div>
        </div>

        {/* What I do — full width below */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-10 border-t border-cream-300"
        >
          <p className="font-hidden text-xs uppercase tracking-[0.3em] text-terracotta-500 mb-6">
            What I do
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {services.map((service, i) => (
              <m.div
                key={service.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: EASE }}
                whileHover={{ y: -6 }}
                className="group rounded-sm border border-cream-300 bg-cream-100 px-5 py-5 transition-colors hover:border-terracotta-500/40 hover:bg-cream-200 hover:shadow-[0_16px_32px_-18px_rgba(45,42,36,0.4)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-sm bg-terracotta-500/10 text-terracotta-600 transition-colors group-hover:bg-terracotta-500 group-hover:text-white">
                    <service.Icon size={17} />
                  </span>
                  <span className="font-hidden text-[11px] tracking-[0.2em] text-muted/70">
                    {service.num}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink-800">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">
                  {service.desc}
                </p>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  )
}
