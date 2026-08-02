import { m } from 'framer-motion'
import { ArrowUp, Mail, MapPin } from 'lucide-react'
import { useScrollTo } from '../hooks/useScrollTo'

const navLinks = [
  { label: 'Home', target: 'hero' },
  { label: 'Projects', target: 'projects' },
  { label: 'About', target: 'about' },
  { label: 'Resume', target: 'resume' },
  { label: 'Contact', target: 'contact' },
]

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'raisalomi595@gmail.com', href: 'mailto:raisalomi595@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Dharan, Nepal' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollTo = useScrollTo()

  return (
    <footer className="relative border-t border-cream-300 bg-cream-100 overflow-hidden">
      {/* Decorative top divider */}
      <div
        className="h-1.5 w-full bg-[repeating-linear-gradient(90deg,var(--color-terracotta-500)_0px,var(--color-terracotta-500)_14px,var(--color-cream-200)_14px,var(--color-cream-200)_28px)]"
        aria-hidden="true"
      />

      {/* Subtle corner decoration */}
      <m.span
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 right-6 md:right-10 text-terracotta-500 pointer-events-none select-none"
        aria-hidden="true"
      >
        ✦
      </m.span>

      <div className="relative mx-auto max-w-8xl px-6 md:px-10 py-14">
        <div className="grid gap-10 md:grid-cols-3 items-start">
          {/* Left: Brand mark */}
          <div>
            <m.button
              onClick={() => scrollTo('hero')}
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="group flex items-center gap-3 cursor-pointer"
              aria-label="Back to top"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-terracotta-500/40 bg-cream-200 text-lg text-terracotta-500 transition-colors group-hover:bg-terracotta-500 group-hover:text-white">
                SR
              </span>
              <span className="text-left">
                <span className="block font-heading text-xl font-bold tracking-tight text-ink-800">
                  Salomi Rai
                </span>
                <span className="block text-xs font-medium uppercase tracking-widest text-muted">
                  Web Developer
                </span>
              </span>
            </m.button>

            <m.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 max-w-xs text-sm text-muted leading-relaxed"
            >
              Design, build &amp; serve. Crafting accessible, performant web
              experiences — one commit at a time.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6 space-y-2"
            >
              {contactDetails.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink-800"
                  >
                    <span className="text-terracotta-500">
                      <Icon size={14} />
                    </span>
                    {item.value}
                  </a>
                )
              })}
            </m.div>
          </div>

          {/* Center: Navigation */}
          <nav aria-label="Footer navigation" className="md:justify-self-center">
            <p className="text-sm font-bold text-ink-800 mb-4 font-heading tracking-wide">
              Explore
            </p>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-1">
              {navLinks.map((link, i) => {
                return (
                  <m.li
                    key={link.target}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.05 * i }}
                  >
                    <button
                      onClick={() => scrollTo(link.target)}
                      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-terracotta-500 cursor-pointer"
                    >
                      <span className="inline-block h-px w-0 bg-terracotta-500 transition-all duration-300 group-hover:w-4" />
                      {link.label}
                    </button>
                  </m.li>
                )
              })}
            </ul>
          </nav>

          {/* Right: Socials + back to top */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-4 text-muted"
            >
              <a
                href="https://github.com/raisalomi595"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-ink-800"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/salomi-rai-923259400/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-ink-800"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href="mailto:raisalomi595@gmail.com"
                aria-label="Email"
                className="transition-colors hover:text-ink-800"
              >
                <Mail size={18} />
              </a>
            </m.div>

            <m.button
              onClick={() => scrollTo('hero')}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-cream-300 bg-cream-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-ink-800 transition-colors hover:border-terracotta-500 hover:text-terracotta-500 cursor-pointer"
            >
              Back to top
              <ArrowUp size={14} />
            </m.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream-300 pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {year} Salomi Rai. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <span aria-hidden="true">✦</span>
            Built with React, TypeScript &amp; Tailwind
            <span aria-hidden="true">✦</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
