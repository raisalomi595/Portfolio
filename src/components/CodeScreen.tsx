import { useEffect, useRef } from 'react'

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export default function CodeScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    canvas.width = 640
    canvas.height = 400

    let time = 0
    let animId: number

    const draw = () => {
      time += 0.016
      const w = canvas.width
      const h = canvas.height

      // === Windows Desktop Background ===
      const deskGrad = ctx.createLinearGradient(0, 0, 0, h)
      deskGrad.addColorStop(0, '#1A6B8A')
      deskGrad.addColorStop(0.4, '#145A78')
      deskGrad.addColorStop(1, '#0D3B50')
      ctx.fillStyle = deskGrad
      ctx.fillRect(0, 0, w, h)

      // Desktop icons
      const deskIcons = [
        { x: 12, y: 12, label: 'This PC' },
        { x: 12, y: 70, label: 'Projects' },
        { x: 12, y: 128, label: 'Recycle Bin' },
      ]
      for (const icon of deskIcons) {
        ctx.fillStyle = 'rgba(255,255,255,0.08)'
        roundRect(ctx, icon.x, icon.y, 32, 32, 4)
        ctx.fill()
        ctx.fillStyle = '#FFF'
        ctx.font = '7px "Segoe UI", Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(icon.label, icon.x + 16, icon.y + 44)
      }

      // === VS CODE WINDOW ===
      const vx = 20, vy = 8, vw = 370, vh = 280

      // Window shadow
      ctx.shadowColor = 'rgba(0,0,0,0.5)'
      ctx.shadowBlur = 14
      ctx.shadowOffsetX = 4
      ctx.shadowOffsetY = 4
      roundRect(ctx, vx, vy, vw, vh, 6)
      ctx.fillStyle = '#1E1E1E'
      ctx.fill()
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // VS Code Title bar
      const titleGrad = ctx.createLinearGradient(vx, vy, vx, vy + 30)
      titleGrad.addColorStop(0, '#2D2D2D')
      titleGrad.addColorStop(1, '#252525')
      roundRect(ctx, vx + 1, vy + 1, vw - 2, 29, 5)
      ctx.fillStyle = titleGrad
      ctx.fill()
      // Flat bottom edge
      ctx.fillRect(vx + 1, vy + 20, vw - 2, 10)

      // Window controls (minimize, maximize, close)
      const ctrlY = vy + 8
      const controls = [
        { x: vx + vw - 48, color: '#FFB900' },
        { x: vx + vw - 34, color: '#00CC6A' },
        { x: vx + vw - 20, color: '#FF5555' },
      ]
      for (const c of controls) {
        ctx.beginPath()
        ctx.arc(c.x, ctrlY + 5, 4, 0, Math.PI * 2)
        ctx.fillStyle = c.color
        ctx.fill()
      }

      // Title text
      ctx.fillStyle = '#CCC'
      ctx.font = '10px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('portfolio  —  Visual Studio Code', vx + vw / 2, vy + 18)

      // Menu bar (File, Edit, Selection, View, ...)
      const menuItems = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help']
      ctx.fillStyle = '#CCCCCC'
      ctx.font = '9px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'left'
      for (let i = 0; i < menuItems.length; i++) {
        ctx.fillText(menuItems[i], vx + 10 + i * 38, vy + 42)
      }

      // Activity bar (left side strip)
      ctx.fillStyle = '#333333'
      ctx.fillRect(vx + 1, vy + 30, 40, vh - 31)
      const activityIcons = ['\u2630', '\uD83D\uDD0D', '\u2350', '\u2261', '\u2699']
      for (let i = 0; i < activityIcons.length; i++) {
        ctx.fillStyle = i === 0 ? '#FFFFFF' : '#888'
        ctx.font = '14px "Segoe UI", Arial, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(activityIcons[i], vx + 21, vy + 52 + i * 36)
      }

      // Sidebar (file explorer)
      ctx.fillStyle = '#252526'
      ctx.fillRect(vx + 41, vy + 30, 110, vh - 31)

      // Sidebar header
      ctx.fillStyle = '#CCCCCC'
      ctx.font = 'bold 9px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText('EXPLORER', vx + 48, vy + 45)

      // Sidebar files
      const files = ['src/', '\u251C\u2500 components/', '\u2502  \u251C\u2500 Hero.tsx', '\u2502  \u251C\u2500 About.tsx', '\u2502  \u2514\u2500 Footer.tsx', '\u251C\u2500 App.tsx', '\u2514\u2500 main.tsx']
      ctx.font = '9px "Consolas", "Courier New", monospace'
      for (let i = 0; i < files.length; i++) {
        ctx.fillStyle = i === 3 ? '#569CD6' : '#999'
        ctx.fillText(files[i], vx + 48, vy + 60 + i * 16)
      }

      // Editor area
      ctx.fillStyle = '#1E1E1E'
      ctx.fillRect(vx + 151, vy + 30, vw - 152, vh - 60)

      // Editor tabs
      ctx.fillStyle = '#2D2D2D'
      ctx.fillRect(vx + 151, vy + 30, vw - 152, 30)
      // Active tab
      ctx.fillStyle = '#1E1E1E'
      roundRect(ctx, vx + 151, vy + 31, 90, 29, 3)
      ctx.fill()
      ctx.fillRect(vx + 151, vy + 44, 90, 16)
      ctx.fillStyle = '#EEE'
      ctx.font = '9px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('App.tsx', vx + 196, vy + 50)
      // Inactive tab
      ctx.fillStyle = '#999'
      ctx.fillText('styles.css', vx + 265, vy + 50)

      // Code lines in editor
      const codeLines = [
        { text: 'import { Routes, Route }', color: '#9CDCFE' },
        { text: "import About from './About'", color: '#9CDCFE' },
        { text: '', color: '' },
        { text: 'function App() {', color: '#D4D4D4' },
        { text: '  return (', color: '#D4D4D4' },
        { text: '    <Routes>', color: '#D4D4D4' },
        { text: '      <Route path="/" />', color: '#CE9178' },
        { text: '      <Route path="/work" />', color: '#CE9178' },
        { text: '      <Route path="*" />', color: '#CE9178' },
        { text: '    </Routes>', color: '#D4D4D4' },
        { text: '  )', color: '#D4D4D4' },
        { text: '}', color: '#D4D4D4' },
        { text: '', color: '' },
        { text: 'export default App', color: '#9CDCFE' },
      ]

      // Line numbers
      const editorX = vx + 157
      const editorStartY = vy + 67
      ctx.font = '10px "Consolas", "Courier New", monospace'
      for (let i = 0; i < codeLines.length; i++) {
        // Line number
        ctx.fillStyle = '#555'
        ctx.textAlign = 'right'
        ctx.fillText(String(i + 1), editorX + 22, editorStartY + i * 16)
        // Code
        if (codeLines[i].text) {
          ctx.fillStyle = codeLines[i].color
          ctx.textAlign = 'left'
          ctx.fillText(codeLines[i].text, editorX + 30, editorStartY + i * 16)

          // Syntax highlight: strings in orange
          if (codeLines[i].color === '#CE9178') {
            const strMatch = codeLines[i].text.match(/'[^']*'|"[^"]*"/g)
            if (strMatch) {
              ctx.fillStyle = '#CE9178'
            }
          }
        }
      }

      // Cursor blink
      if (Math.sin(time * 4) > 0) {
        ctx.fillStyle = '#FFF'
        ctx.fillRect(editorX + 146, editorStartY + 12 * 16 - 1, 6, 12)
      }

      // Status bar
      ctx.fillStyle = '#007ACC'
      ctx.fillRect(vx + 1, vy + vh - 22, vw - 2, 21)
      ctx.fillStyle = '#FFF'
      ctx.font = '9px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText('main  |  TypeScript  |  Prettier  |  UTF-8', vx + 12, vy + vh - 7)
      ctx.textAlign = 'right'
      ctx.fillText('Ln 14, Col 8', vx + vw - 12, vy + vh - 7)

      // === CMD WINDOW ===
      const cx = 200, cy = 150, cw = 280, ch = 180

      ctx.shadowColor = 'rgba(0,0,0,0.5)'
      ctx.shadowBlur = 14
      ctx.shadowOffsetX = 4
      ctx.shadowOffsetY = 4
      roundRect(ctx, cx, cy, cw, ch, 6)
      ctx.fillStyle = '#0C0C0C'
      ctx.fill()
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // CMD Title bar
      const cmdTitleGrad = ctx.createLinearGradient(cx, cy, cx, cy + 28)
      cmdTitleGrad.addColorStop(0, '#FFFFFF')
      cmdTitleGrad.addColorStop(1, '#E8E8E8')
      roundRect(ctx, cx + 1, cy + 1, cw - 2, 27, 5)
      ctx.fillStyle = cmdTitleGrad
      ctx.fill()
      ctx.fillRect(cx + 1, cy + 20, cw - 2, 8)

      // CMD icon (simplified)
      ctx.fillStyle = '#000'
      ctx.font = 'bold 12px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText('\u25A0', cx + 10, cy + 18)

      ctx.fillStyle = '#000'
      ctx.font = '10px "Segoe UI", Arial, sans-serif'
      ctx.fillText('Command Prompt', cx + 28, cy + 18)

      // CMD window controls
      const cmdCtrlY = cy + 6
      const cmdControls = [
        { x: cx + cw - 60, color: '#FFB900' },
        { x: cx + cw - 46, color: '#00CC6A' },
        { x: cx + cw - 32, color: '#FF5555' },
      ]
      for (const c of cmdControls) {
        ctx.beginPath()
        ctx.arc(c.x, cmdCtrlY + 5, 4, 0, Math.PI * 2)
        ctx.fillStyle = c.color
        ctx.fill()
      }

      // Minimize/maximize lines
      ctx.strokeStyle = '#555'
      ctx.lineWidth = 0.8
      // Minimize
      ctx.beginPath()
      ctx.moveTo(cx + cw - 62, cmdCtrlY + 5)
      ctx.lineTo(cx + cw - 58, cmdCtrlY + 5)
      ctx.stroke()
      // Maximize
      ctx.strokeRect(cx + cw - 48, cmdCtrlY + 2, 5, 5)

      // CMD body
      ctx.fillStyle = '#0C0C0C'
      ctx.fillRect(cx + 1, cy + 28, cw - 2, ch - 29)

      // CMD text lines
      const cmdLines = [
        'Microsoft Windows [Version 10.0.22631]',
        '(c) Microsoft Corporation. All rights reserved.',
        '',
        'C:\\Users\\Salomi\\portfolio>',
      ]

      ctx.font = '10px "Consolas", "Courier New", monospace'
      ctx.textAlign = 'left'

      for (let i = 0; i < cmdLines.length; i++) {
        ctx.fillStyle = i === 3 ? '#FFD700' : '#CCC'
        ctx.fillText(cmdLines[i], cx + 12, cy + 46 + i * 16)
      }

      // Current command being typed
      ctx.fillStyle = '#FFD700'
      ctx.fillText('npm run dev', cx + 172, cy + 46 + 3 * 16)

      // Blinking cursor after prompt
      if (Math.sin(time * 4) > 0) {
        ctx.fillStyle = '#FFF'
        ctx.fillRect(cx + 12 + ctx.measureText('C:\\Users\\Salomi\\portfolio>npm run dev').width, cy + 46 + 3 * 16 - 2, 5, 12)
      }

      // More command output below
      const outputLines = [
        '',
        '  VITE v8.0.16  ready in 320ms',
        '',
        '  \u279C  Local:   http://localhost:5173/',
        '  \u279C  Network: use --host to expose',
        '',
      ]
      for (let i = 0; i < outputLines.length; i++) {
        ctx.fillStyle = outputLines[i].includes('Local') ? '#4ADE80' : '#AAA'
        ctx.fillText(outputLines[i], cx + 12, cy + 106 + i * 16)
      }

      // Scrollbar
      ctx.fillStyle = '#333'
      roundRect(ctx, cx + cw - 10, cy + 29, 8, ch - 30, 2)
      ctx.fill()
      ctx.fillStyle = '#555'
      roundRect(ctx, cx + cw - 9, cy + 40, 6, 50, 2)
      ctx.fill()

      // CRT scanlines
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      for (let sy = 0; sy < h; sy += 3) {
        ctx.fillRect(0, sy, w, 1)
      }

      // CRT vignette
      const vg = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.6)
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(0.7, 'rgba(0,0,0,0)')
      vg.addColorStop(0.9, 'rgba(0,0,0,0.06)')
      vg.addColorStop(1, 'rgba(0,0,0,0.2)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, w, h)

      // Taskbar at bottom
      ctx.fillStyle = 'rgba(0,0,0,0.7)'
      ctx.fillRect(0, h - 24, w, 24)
      // Start button
      ctx.fillStyle = '#CCC'
      ctx.font = '9px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText('\u25A0 Start', 8, h - 9)
      // Taskbar items
      ctx.fillStyle = '#555'
      roundRect(ctx, 60, h - 21, 70, 18, 3)
      ctx.fill()
      ctx.fillStyle = '#AAA'
      ctx.font = '8px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('VS Code', 95, h - 9)
      // Clock
      ctx.fillStyle = '#CCC'
      ctx.font = '9px "Segoe UI", Arial, sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText('10:41 AM', w - 10, h - 9)
    }

    const loop = () => { draw(); animId = requestAnimationFrame(loop) }
    animId = requestAnimationFrame(loop)
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
