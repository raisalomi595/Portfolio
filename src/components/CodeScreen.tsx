import { useEffect, useRef } from 'react'

const LINES = [
  'function Portfolio() {',
  '  const [mounted, setMounted] = useState(false)',
  '  const skills = ["React", "Three.js", "TypeScript"]',
  '',
  '  useEffect(() => {',
  '    setMounted(true)',
  '    console.log("Hello, world! 👋")',
  '  }, [])',
  '',
  '  return (',
  '    <div className="hero">',
  '      <h1>Hi, I\'m Soifon Rai</h1>',
  '      <p>Full-stack developer</p>',
  '    </div>',
  '  )',
  '}',
  '',
  'export default Portfolio',
]

const CHARS_PER_SECOND = 15
const LOOP_PAUSE_MS = 2500

export default function CodeScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    canvas.width = 640
    canvas.height = 400

    let charIndex = 0
    const totalChars = LINES.join('\n').length
    let direction = 1
    let paused = false
    let pauseTimer = 0

    const draw = () => {
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const grad = ctx.createRadialGradient(320, 200, 30, 320, 200, 350)
      grad.addColorStop(0, '#222')
      grad.addColorStop(1, '#111')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '16px "Courier New", Courier, monospace'
      ctx.textBaseline = 'top'

      let drawn = 0
      for (let li = 0; li < LINES.length; li++) {
        const line = LINES[li]
        if (drawn >= charIndex) break
        const chars = Math.min(line.length, charIndex - drawn)
        if (chars <= 0) { drawn += line.length + 1; continue }

        ctx.fillStyle = '#4ade80'
        ctx.fillText(line.slice(0, chars), 20, 22 + li * 27)
        drawn += line.length + 1
      }

      if (charIndex < totalChars && !paused) {
        const cl = Math.min(Math.floor(charIndex / 40), LINES.length - 1)
        const cc = charIndex % 40
        const cx = 20 + cc * 9.6
        const cy = 22 + cl * 27
        ctx.fillStyle = '#4ade80'
        ctx.fillRect(cx, cy, 7, 16)
      }
    }

    let animId: number
    let last = performance.now()

    const tick = (now: number) => {
      const dt = now - last
      last = now

      if (paused) {
        pauseTimer += dt
        if (pauseTimer >= LOOP_PAUSE_MS) { paused = false; pauseTimer = 0; direction *= -1 }
      } else {
        charIndex += direction * Math.max(1, Math.floor((dt / 1000) * CHARS_PER_SECOND))
        if (charIndex >= totalChars) { charIndex = totalChars; paused = true; pauseTimer = 0 }
        else if (charIndex <= 0) { charIndex = 0; paused = true; pauseTimer = 0; direction *= -1 }
      }

      draw()
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
