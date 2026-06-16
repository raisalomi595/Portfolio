import { useEffect, useState } from 'react'

const SECTIONS = ['projects', 'about', 'resume', 'contact']

export default function useActiveSection() {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActive(id)
        }
      }
    }

    for (const id of SECTIONS) {
      const el = document.getElementById(id)
      if (el) {
        const observer = new IntersectionObserver(handleIntersect(id), {
          rootMargin: '-30% 0px -60% 0px',
          threshold: 0,
        })
        observer.observe(el)
        observers.push(observer)
      }
    }

    return () => {
      for (const obs of observers) obs.disconnect()
    }
  }, [])

  return active
}
