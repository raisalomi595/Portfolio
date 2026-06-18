import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollTo } from '../hooks/useScrollTo'
import useActiveSection from '../hooks/useActiveSection'
import { Link, useLocation } from 'react-router-dom'

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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-cream-100/80 border-b border-cream-300">
      <nav
        className="flex items-center justify-between py-4 pr-4 sm:pr-6 lg:pr-8"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-ink-800"
        >
          Salomi<span className="text-terracotta-500">Rai</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8" role="list">
          {links.map((link) => {
            const isActive = activeSection === link.target
            return (
              <li key={link.target}>
                <button
                  onClick={() => handleNav(link.target)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-terracotta-500'
                      : 'text-muted hover:text-ink-800'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            )
          })}
        </ul>

        <button
          className="md:hidden p-2 text-ink-800 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div
          className="md:hidden border-t border-cream-300 bg-cream-100"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col px-6 py-4 gap-4" role="list">
            {links.map((link) => {
              const isActive = activeSection === link.target
              return (
                <li key={link.target}>
                  <button
                    onClick={() => handleNav(link.target)}
                    className={`w-full text-left text-sm font-medium py-2 cursor-pointer ${
                      isActive
                        ? 'text-terracotta-500'
                        : 'text-muted hover:text-ink-800'
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
