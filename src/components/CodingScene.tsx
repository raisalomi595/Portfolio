import { useEffect, useRef } from 'react'

function gearPath(cx: number, cy: number, r: number, teeth: number, toothSize: number): string {
  const pts: { x: number; y: number }[] = []
  const steps = teeth * 2
  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 2 - Math.PI / 2
    const outer = i % 2 === 0
    const rad = outer ? r + toothSize : r * 0.85
    pts.push({ x: cx + Math.cos(angle) * rad, y: cy + Math.sin(angle) * rad })
  }
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('') + 'Z'
}

function drawGear(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, teeth: number, color: string, rotation: number, depth = 4) {
  const path = gearPath(cx, cy, r, teeth, r * 0.18)
  // Extrusion (shadow layer)
  for (let d = depth; d > 0; d--) {
    ctx.beginPath()
    ctx.setTransform(1, 0, 0, 1, d * 0.6, d * 0.4)
    const p = gearPath(cx - d * 0.6, cy - d * 0.4 + d, r, teeth, r * 0.18)
    const pp = new Path2D(p)
    ctx.fillStyle = `rgba(0,0,0,${0.08 + d * 0.02})`
    ctx.fill(pp)
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  // Draw gear
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(rotation)
  ctx.translate(-cx, -cy)
  const p2 = new Path2D(path)
  ctx.fillStyle = color
  ctx.fill(p2)
  // Inner hole
  ctx.beginPath()
  ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2)
  ctx.fillStyle = '#ECECEC'
  ctx.fill()
  // Center dot
  ctx.beginPath()
  ctx.arc(cx, cy, r * 0.08, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
}

function drawBadge(ctx: CanvasRenderingContext2D, x: number, y: number, label: string, color: string, rot: number, float: number) {
  ctx.save()
  ctx.translate(x, y + float)
  ctx.rotate(rot)
  const bw = 70, bh = 28
  // Shadow
  ctx.shadowColor = `rgba(0,0,0,0.1)`
  ctx.shadowBlur = 12
  ctx.shadowOffsetY = 4
  // Body
  const r = 14
  ctx.beginPath()
  ctx.moveTo(-bw / 2 + r, -bh / 2)
  ctx.lineTo(bw / 2 - r, -bh / 2)
  ctx.quadraticCurveTo(bw / 2, -bh / 2, bw / 2, -bh / 2 + r)
  ctx.lineTo(bw / 2, bh / 2 - r)
  ctx.quadraticCurveTo(bw / 2, bh / 2, bw / 2 - r, bh / 2)
  ctx.lineTo(-bw / 2 + r, bh / 2)
  ctx.quadraticCurveTo(-bw / 2, bh / 2, -bw / 2, bh / 2 - r)
  ctx.lineTo(-bw / 2, -bh / 2 + r)
  ctx.quadraticCurveTo(-bw / 2, -bh / 2, -bw / 2 + r, -bh / 2)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.shadowColor = 'transparent'
  // Text
  ctx.fillStyle = '#1a1a2e'
  ctx.font = 'bold 12px "Courier New", monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, 0, 1)
  ctx.restore()
}

export default function CodingScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let time = 0

    const resize = () => {
      const parent = canvas.parentElement!
      canvas.width = parent.clientWidth * devicePixelRatio
      canvas.height = parent.clientHeight * devicePixelRatio
      canvas.style.width = parent.clientWidth + 'px'
      canvas.style.height = parent.clientHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      }
    }
    canvas.addEventListener('mousemove', handleMouse)

    const draw = () => {
      time += 0.016
      const w = canvas.width / devicePixelRatio
      const h = canvas.height / devicePixelRatio
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const px = mx * 12
      const py = my * 8

      ctx.clearRect(0, 0, w, h)

      // Background
      ctx.fillStyle = '#F2F2F2'
      ctx.fillRect(0, 0, w, h)

      ctx.save()
      ctx.translate(w / 2 + px * 0.2, h / 2 + py * 0.2)

      // Background brackets </>
      ctx.save()
      ctx.globalAlpha = 0.12 + Math.sin(time * 0.5) * 0.03
      ctx.font = 'bold 160px "Courier New", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#4A4DFF'
      ctx.fillText('</>', 0, -10)
      ctx.restore()

      // Gears
      const g1r = 42
      drawGear(ctx, -w * 0.25 + Math.sin(time * 0.4) * 3, -20 + Math.cos(time * 0.3) * 2, g1r, 12, '#FF4FB8', time * 0.6, 4)
      drawGear(ctx, -w * 0.25 + 50 + Math.sin(time * 0.5) * 2, -20 - 35 + Math.cos(time * 0.4) * 2, 22, 8, '#A8FF00', -time * 0.8, 3)

      // CODING text with 3D extrusion
      const textX = 0
      const textY = -8
      const fontSize = Math.min(w * 0.12, 72)
      ctx.font = `bold ${fontSize}px "Courier New", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Perspective tilt
      ctx.setTransform(1, 0, -0.08, 1, w / 2 + px * 0.3, h / 2 + py * 0.3)

      // Extrusion layers
      for (let d = 6; d >= 0; d--) {
        ctx.fillStyle = d === 0 ? '#4A4DFF' : `rgba(30,30,80,${0.04 + d * 0.025})`
        ctx.fillText('CODING', textX - d * 0.8, textY + d * 0.5)
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      // Breathing scale
      const breathe = 1 + Math.sin(time * 0.6) * 0.008
      ctx.setTransform(1, 0, -0.08, 1, w / 2 + px * 0.3, h / 2 + py * 0.3)
      ctx.scale(breathe, breathe)
      ctx.fillStyle = '#4A4DFF'
      ctx.fillText('CODING', textX, textY)
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      // Cursor
      const cursorX = 40 + Math.sin(time * 0.8) * 2
      const cursorY = 18 + Math.sin(time * 1.2) * 1.5
      ctx.save()
      ctx.translate(w / 2 + px * 0.3 + cursorX, h / 2 + py * 0.3 + cursorY)
      const cScale = 1 + Math.sin(time * 4) * 0.03
      ctx.scale(cScale, cScale)
      ctx.strokeStyle = '#FFC83D'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(0, -10)
      ctx.lineTo(14, 0)
      ctx.lineTo(0, 10)
      ctx.closePath()
      ctx.stroke()
      ctx.restore()

      // Badges
      const bFloat1 = Math.sin(time * 0.7) * 6
      const bFloat2 = Math.sin(time * 0.7 + 1.5) * 6
      const bFloat3 = Math.sin(time * 0.7 + 3) * 6

      drawBadge(ctx, -w * 0.2 + px * 0.1, 45 + bFloat1, 'HTML5', '#8DC8FF', -0.12, 0)
      drawBadge(ctx, w * 0.18 + px * 0.1, 40 + bFloat2, 'CSS3', '#A8FF00', 0.1, 0)
      drawBadge(ctx, w * 0.15 + px * 0.1, -55 + bFloat3, 'C++', '#FF8ACB', 0.15, 0)

      ctx.restore()
    }

    const loop = () => { draw(); animId = requestAnimationFrame(loop) }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block rounded-2xl"
      aria-hidden="true"
    />
  )
}
