import { useState } from 'react'
import { m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollTo } from '../hooks/useScrollTo'
import useActiveSection from '../hooks/useActiveSection'

const links = [
  { folio: '01', label: 'Projects', target: 'projects' },
  { folio: '02', label: 'About', target: 'about' },
  { folio: '03', label: 'Resume', target: 'resume' },
  { folio: '04', label: 'Contact', target: 'contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const scrollTo = useScrollTo()
  const activeSection = useActiveSection()

  const handleNav = (target: string) => {
    scrollTo(target)
    setOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-paper/85 border-b border-rule">
      <nav
        className="flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <button
          onClick={() => scrollTo('hero')}
          className="group flex items-center gap-3 cursor-pointer"
          aria-label="Salomi Rai — back to top"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center border border-ink font-display text-[13px] font-semibold leading-none text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-paper">
            SR
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft sm:block">
            Salomi Rai <span className="text-muted">— Web Developer</span>
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-7" role="list">
          {links.map((link, i) => {
            const isActive = activeSection !== 'hero' && activeSection === link.target
            return (
              <m.li
                key={link.target}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
              >
                <button
                  onClick={() => handleNav(link.target)}
                  className={`group relative flex items-baseline gap-1.5 pb-1 font-mono text-xs uppercase tracking-[0.16em] cursor-pointer transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-terracotta after:transition-transform after:duration-300 ${
                    isActive
                      ? 'text-ink after:scale-x-100'
                      : 'text-ink-soft after:scale-x-0 hover:text-ink hover:after:scale-x-100'
                  }`}
                >
                  <span
                    className={`text-[10px] ${isActive ? 'text-terracotta-deep' : 'text-muted'}`}
                    aria-hidden="true"
                  >
                    {link.folio}
                  </span>
                  {link.label}
                </button>
              </m.li>
            )
          })}
        </ul>

        <button
          className="md:hidden p-2 text-ink cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div
          className="md:hidden border-t border-rule bg-paper"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col px-6 py-3 gap-1" role="list">
            {links.map((link) => {
              const isActive = activeSection !== 'hero' && activeSection === link.target
              return (
                <li key={link.target}>
                  <button
                    onClick={() => handleNav(link.target)}
                    className={`flex w-full items-baseline gap-3 py-2.5 border-b border-rule/60 font-mono text-sm uppercase tracking-[0.16em] cursor-pointer ${
                      isActive ? 'text-terracotta-deep' : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    <span className="text-[10px] text-muted" aria-hidden="true">
                      {link.folio}
                    </span>
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
