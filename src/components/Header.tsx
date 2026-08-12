import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollTo } from '../hooks/useScrollTo'
import useActiveSection from '../hooks/useActiveSection'
import { useLocation } from 'react-router-dom'

const links = [
  { label: 'Projects', target: 'projects' },
  { label: 'About', target: 'about' },
  { label: 'Resume', target: 'resume' },
  { label: 'Contact', target: 'contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const scrollTo = useScrollTo()
  const activeSection = useActiveSection()
  const location = useLocation()
  const isResumePage = location.pathname === '/resume'

  const handleNav = (target: string) => {
    if (isResumePage) {
      window.location.assign('/#' + target)
      return
    }
    scrollTo(target)
    setOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-honey-blush/80 border-b border-honey-espresso/10">
      <nav
        className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <button
          onClick={() => scrollTo('hero')}
          className="font-display text-3xl uppercase tracking-tight text-honey-espresso cursor-pointer"
        >
          Salomi<span className="text-honey-accent">Rai</span>
        </button>

        <ul className="hidden md:flex items-center gap-8" role="list">
          {links.map((link) => {
            const isActive = activeSection !== 'hero' && activeSection === link.target
            return (
              <li key={link.target}>
                <button
                  onClick={() => handleNav(link.target)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-honey-accent'
                      : 'text-honey-espresso/60 hover:text-honey-accent'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            )
          })}
        </ul>

        <button
          className="md:hidden p-2 text-honey-espresso cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div
          className="md:hidden border-t border-honey-espresso/10 bg-honey-blush"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col px-6 py-4 gap-4" role="list">
            {links.map((link) => {
              const isActive = activeSection !== 'hero' && activeSection === link.target
              return (
                <li key={link.target}>
                  <button
                    onClick={() => handleNav(link.target)}
                    className={`w-full text-left text-sm font-medium py-2 cursor-pointer ${
                      isActive
                        ? 'text-terracotta-500'
                        : 'text-muted hover:text-terracotta-500'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
