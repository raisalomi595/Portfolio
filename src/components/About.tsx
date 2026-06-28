import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

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

    canvas.addEventListener('mouseenter', () => { hoverRef.current = 1 })
    canvas.addEventListener('mouseleave', () => { hoverRef.current = 0 })

    const draw = () => {
      time += 0.016
      const w = canvas.width
      const h = canvas.height
      const hover = hoverRef.current

      ctx.clearRect(0, 0, w, h)

      // Canvas weave texture
      const step = 6
      ctx.strokeStyle = 'rgba(139, 129, 116, 0.12)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < w; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + step * 0.5, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y + step * 0.5)
        ctx.stroke()
      }

      // Subtle vignette
      const grad = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.7)
      grad.addColorStop(0, 'rgba(0,0,0,0)')
      grad.addColorStop(1, 'rgba(0,0,0,0.08)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Animated film grain
      const grain = ctx.createImageData(w, h)
      for (let i = 0; i < grain.data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 12
        grain.data[i] = 128 + noise
        grain.data[i + 1] = 128 + noise
        grain.data[i + 2] = 128 + noise
        grain.data[i + 3] = 6
      }
      ctx.putImageData(grain, 0, 0)

      // Warp shift — subtle horizontal wave
      if (hover < 1) {
        const warp = ctx.getImageData(0, 0, w, h)
        const shift = Math.sin(time * 0.8) * 1.5
        ctx.putImageData(warp, shift, 0)
      }

      canvas.style.opacity = String(Math.max(0, 1 - hover * 0.85))
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden="true"
    />
  )
}

export default function About() {
  return (
    <section id="about" className="bg-cream-50 py-24 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <motion.div
              className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-cream-200"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <img
                src="/About.jpeg"
                alt="Salomi Rai"
                className="h-full w-full object-cover"
              />
              <CanvasOverlay />
            </motion.div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 flex flex-col justify-center"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-terracotta-500 mb-4">
              About
            </p>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink-800 leading-[1.1]">
              Salomi Rai
            </h2>
            

            <div className="mt-6 space-y-4 text-base text-muted leading-relaxed max-w-xl">
              <p>
                I'm a Web Developer with a strong interest in building modern,
                responsive, and interactive web applications. I enjoy the space
                where logic meets design — turning complex problems into simple,
                beautiful digital experiences.
              </p>
              <p>
                Currently expanding my knowledge of React, TypeScript, Java, and
                full-stack development. I believe in writing clean code,
                creating accessible interfaces, and continuously learning.
              </p>
              <p>
                I'm seeking opportunities to collaborate on meaningful projects,
                gain industry experience, and grow as a developer.
              </p>
            </div>

            {/* Skills inline */}
            <div className="mt-6 flex flex-wrap gap-x-1 gap-y-1 text-sm text-ink-800">
              {skillsList.map((skill, i) => (
                <span key={skill}>
                  {i > 0 && <span className="text-terracotta-500 mx-2">◍</span>}
                  {skill}
                </span>
              ))}
            </div>

            {/* Certificates */}
            <div className="mt-8">
              <p className="text-sm font-medium text-ink-800 mb-2">Certificates</p>
              <div className="space-y-1">
                <p className="text-sm text-muted">
                  Java Object-Oriented Programming (OOP)
                </p>
                <p className="text-xs text-muted/70 break-all">
                  LinkedIn Learning | Credential ID: 255728632bca084b92e4cd1cda91880c1c1843a99c5529cccbe5ce0fd3c6ecec
                </p>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-4 text-muted">
              <a
                href="https://github.com/raisalomi595"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-ink-800"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/salomi-rai-923259400/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-ink-800"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href="mailto:raisalomi595@gmail.com"
                aria-label="Email"
                className="transition-colors hover:text-ink-800"
              >
                <Mail size={18} />
              </a>
            </div>

            {/* Currently */}
            <div className="mt-10 pt-8 border-t border-cream-300">
              <p className="text-xs font-medium uppercase tracking-widest text-terracotta-500 mb-3">
                Currently
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
                <span>
                  <span className="text-ink-800 font-medium">Building</span>{' '}
                  SecondHome & PeerLearn
                </span>
                <span>
                  <span className="text-ink-800 font-medium">Learning</span>{' '}
                  Java & MySQL
                </span>
                <span>
                  <span className="text-ink-800 font-medium">Reading</span>{' '}
                  Clean Code
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
