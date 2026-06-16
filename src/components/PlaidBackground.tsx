import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function PlaidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], [0, 120])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0
    let prevTime = performance.now()

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (now: number) => {
      const dt = Math.min((now - prevTime) / 1000, 0.05)
      prevTime = now
      time += dt * 0.15

      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      const driftX = Math.sin(time * 0.3) * 3
      const driftY = Math.cos(time * 0.25) * 3
      const breathe = 1 + Math.sin(time * 0.2) * 0.004

      const cellSize = Math.max(w, h) * 0.035 * breathe

      const light = '#F5F0EB'
      const mid = '#EDE6DC'
      const dark = '#E0D5C8'

      ctx.fillStyle = light
      ctx.fillRect(0, 0, w, h)

      const cols = Math.ceil(w / cellSize) + 2
      const rows = Math.ceil(h / cellSize) + 2
      const startX = -cellSize + (driftX % cellSize)
      const startY = -cellSize + (driftY % cellSize)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = startX + c * cellSize
          const cy = startY + r * cellSize
          const isDarkH = r % 2 === 0
          const isDarkV = c % 2 === 0

          if (isDarkH && isDarkV) {
            ctx.fillStyle = dark
          } else if (isDarkH || isDarkV) {
            ctx.fillStyle = mid
          } else {
            continue
          }

          ctx.fillRect(cx, cy, cellSize, cellSize)
        }
      }

      // Softer noise — skip every other frame for performance
      if (Math.floor(time * 10) % 2 === 0) {
        const step = 5
        for (let x = 0; x < w; x += step) {
          for (let y = 0; y < h; y += step) {
            const seed = (x * 12.9898 + y * 78.233 + time * 50) % (2 * Math.PI)
            const noise = (Math.sin(seed) + 1) * 0.5
            const alpha = noise * 0.025
            ctx.fillStyle = `rgba(139, 129, 116, ${alpha.toFixed(4)})`
            ctx.fillRect(x, y, step, step)
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ y: bgY }}
      aria-hidden="true"
    />
  )
}
