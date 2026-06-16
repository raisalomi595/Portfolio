import { useMotionValue, useSpring, useTransform, type MotionStyle } from 'framer-motion'
import { useCallback } from 'react'

interface TiltReturn {
  style: MotionStyle
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void
  onMouseLeave: () => void
}

export function useTilt(limit = 8): TiltReturn {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [limit, -limit]), {
    stiffness: 300,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-limit, limit]), {
    stiffness: 300,
    damping: 20,
  })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      x.set((e.clientX - rect.left) / rect.width - 0.5)
      y.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [x, y],
  )

  const onMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return {
    style: { rotateX, rotateY, transformStyle: 'preserve-3d' as const },
    onMouseMove,
    onMouseLeave,
  }
}
