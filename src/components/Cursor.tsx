import { useEffect, useRef, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'

/* Minimal dot + trailing ring. Fine pointers only, no touch, no reduced motion. */
export default function Cursor() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [hovering, setHovering] = useState(false)
  const hoverRef = useRef(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { stiffness: 550, damping: 45, mass: 0.4 })
  const dotY = useSpring(y, { stiffness: 550, damping: 45, mass: 0.4 })
  const ringX = useSpring(x, { stiffness: 170, damping: 22 })
  const ringY = useSpring(y, { stiffness: 170, damping: 22 })

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target instanceof Element ? e.target.closest('a,button,[data-cursor]') : null
      const h = !!t
      if (h !== hoverRef.current) {
        hoverRef.current = h
        setHovering(h)
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <m.div aria-hidden="true" style={{ x: dotX, y: dotY }} className="pointer-events-none fixed left-0 top-0 z-[200]">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-ink transition-transform duration-200 ${
            hovering ? 'h-3 w-3 scale-100 opacity-60' : 'h-1.5 w-1.5 scale-100 opacity-90'
          }`}
        />
      </m.div>
      <m.div aria-hidden="true" style={{ x: ringX, y: ringY }} className="pointer-events-none fixed left-0 top-0 z-[200]">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/50 transition-transform duration-300 ${
            hovering ? 'h-12 w-12 scale-100 opacity-70' : 'h-7 w-7 scale-100 opacity-50'
          }`}
        />
      </m.div>
    </>
  )
}
