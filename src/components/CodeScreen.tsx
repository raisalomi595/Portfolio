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
  "      <h1>Hi, I'm Soifon Rai</h1>",
  '      <p>Full-stack developer</p>',
  '    </div>',
  '  )',
  '}',
  '',
  'export default Portfolio',
]

const CHARS_PER_SECOND = 15
const PAUSE_AT_CODE_MS = 2500
const IMAGE_DISPLAY_MS = 4000
const FADE_MS = 1500

export default function CodeScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    canvas.width = 640
    canvas.height = 400

    const img = new Image()
    img.src = '/img1.jpg'
    let loaded = false
    img.onload = () => { loaded = true }

    let charIndex = 0
    const totalChars = LINES.join('\n').length
    let phase: 'typing' | 'pause' | 'fadeInImg' | 'showImg' | 'fadeOutImg' = 'typing'
    let phaseTimer = 0
    let fade = 0
    let last = performance.now()
    let animId: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const showCode = phase === 'typing' || phase === 'pause' || phase === 'fadeInImg'

      const codeAlpha = phase === 'fadeInImg' ? 1 - fade : showCode ? 1 : 0
      const imgAlpha = phase === 'fadeInImg' ? fade : phase === 'showImg' ? 1 : phase === 'fadeOutImg' ? 1 - fade : 0

      // Background
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const grad = ctx.createRadialGradient(320, 200, 30, 320, 200, 350)
      grad.addColorStop(0, '#222')
      grad.addColorStop(1, '#111')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Code
      if (codeAlpha > 0) {
        ctx.save()
        ctx.globalAlpha = codeAlpha
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
        if (charIndex < totalChars) {
          const cl = Math.min(Math.floor(charIndex / 40), LINES.length - 1)
          const cc = charIndex % 40
          ctx.fillStyle = '#4ade80'
          ctx.fillRect(20 + cc * 9.6, 22 + cl * 27, 7, 16)
        }
        ctx.restore()
      }

      // Image
      if (imgAlpha > 0 && loaded) {
        ctx.save()
        ctx.globalAlpha = imgAlpha
        const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
        ctx.drawImage(
          img,
          (canvas.width - img.naturalWidth * s) / 2,
          (canvas.height - img.naturalHeight * s) / 2,
          img.naturalWidth * s,
          img.naturalHeight * s,
        )
        ctx.restore()
      }
    }

    const tick = (now: number) => {
      const dt = now - last
      last = now

      switch (phase) {
        case 'typing':
          charIndex += Math.max(1, Math.floor((dt / 1000) * CHARS_PER_SECOND))
          if (charIndex >= totalChars) { charIndex = totalChars; phase = 'pause'; phaseTimer = 0 }
          break
        case 'pause':
          phaseTimer += dt
          if (phaseTimer >= PAUSE_AT_CODE_MS) { phase = 'fadeInImg'; fade = 0 }
          break
        case 'fadeInImg':
          fade += dt / FADE_MS
          if (fade >= 1) { fade = 1; phase = 'showImg'; phaseTimer = 0 }
          break
        case 'showImg':
          phaseTimer += dt
          if (phaseTimer >= IMAGE_DISPLAY_MS) { phase = 'fadeOutImg'; fade = 0 }
          break
        case 'fadeOutImg':
          fade += dt / FADE_MS
          if (fade >= 1) { charIndex = 0; phase = 'typing' }
          break
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
