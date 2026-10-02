import { useEffect, useRef, useState } from 'react'
import { m } from 'framer-motion'
import { Send, Check, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'raisalomi595@gmail.com', href: 'mailto:raisalomi595@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+977 9807317882', href: 'tel:+9779807317882' },
  { icon: MapPin, label: 'Location', value: 'Dharan, Nepal' },
]

const SocialLinkedin = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
)
const SocialGithub = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
)

const socialLinks = [
  { icon: SocialLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/salomi-rai-923259400/' },
  { icon: SocialGithub, label: 'GitHub', href: 'https://github.com/raisalomi595' },
]

/* Printer's ornaments — static (two-ink palette, no infinite loops) */
const ornaments: {
  char: string
  top?: string
  bottom?: string
  right: string
  size: number
  className: string
}[] = [
  { char: '✦', top: '10%', right: '5%', size: 18, className: 'text-terracotta-deep' },
  { char: '●', top: '50%', right: '12%', size: 10, className: 'text-ink/25' },
  { char: '■', bottom: '20%', right: '8%', size: 12, className: 'text-ink/25' },
]

type FieldName = 'name' | 'email' | 'message'
type FieldErrors = Partial<Record<FieldName, string>>

const labelCls = 'mb-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft'
const inputCls =
  'w-full border-b border-ink/30 bg-transparent px-0 py-3 text-base text-ink placeholder:text-muted transition-colors focus:border-terracotta focus:outline-none'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [showSummary, setShowSummary] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)

  const validateField = (field: FieldName, value: string): string | undefined => {
    if (field === 'name') return value.trim() ? undefined : 'Enter your name'
    if (field === 'email') {
      if (!value.trim()) return 'Enter your email address'
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? undefined
        : 'Enter a valid email address'
    }
    return value.trim() ? undefined : 'Enter a message'
  }

  const values: Record<FieldName, string> = { name, email, message }

  const handleBlur = (field: FieldName) => {
    const msg = validateField(field, values[field])
    setErrors((prev) => ({ ...prev, [field]: msg }))
  }

  const hasErrors = Object.values(errors).some(Boolean)

  // Focus moves to the error summary only after a failed submit — never on blur
  useEffect(() => {
    if ((showSummary || submitError) && summaryRef.current) {
      summaryRef.current.focus()
    }
  }, [showSummary, submitError])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError('')

    const nextErrors: FieldErrors = {
      name: validateField('name', name),
      email: validateField('email', email),
      message: validateField('message', message),
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {
      setShowSummary(true)
      return
    }
    setShowSummary(false)

    setSubmitting(true)
    try {
      const res = await fetch('https://formsubmit.co/ajax/raisalomi595@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error()

      setSucceeded(true)
      setName('')
      setEmail('')
      setMessage('')
      setErrors({})
    } catch {
      setSubmitError('Failed to send. Please email me directly at raisalomi595@gmail.com')
    } finally {
      setSubmitting(false)
    }
  }

  const errorText = (field: FieldName) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta-deep">
        {errors[field]}
      </p>
    ) : null

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-paper py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden="true">
        {ornaments.map((o, i) => (
          <m.span
            key={i}
            className={`absolute ${o.className}`}
            style={{ top: o.top, right: o.right, bottom: o.bottom, fontSize: o.size }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
          >
            {o.char}
          </m.span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-8xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-5">
          {/* LEFT: Info */}
          <m.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <m.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-terracotta-deep"
            >
              Let's Connect
            </m.p>

            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl"
            >
              I'm currently seeking job opportunities and looking to grow my experience in web development.
            </m.h2>

            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-base leading-relaxed text-muted"
            >
              Whether you have a project, collaboration opportunity, or simply want to connect, I'd be happy to hear from you.
            </m.p>

            {/* Contact details */}
            <div className="mt-8 space-y-3">
              {contactInfo.map((item, i) => {
                const Icon = item.icon
                return (
                  <m.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="flex h-8 w-8 items-center justify-center border border-rule bg-paper-deep text-terracotta-deep">
                      <Icon size={15} />
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-muted transition-colors hover:text-ink">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-muted">{item.value}</span>
                    )}
                  </m.div>
                )
              })}
            </div>

            {/* Social links */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 flex items-center gap-4"
            >
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-terracotta-deep"
                  >
                    <Icon size={16} />
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                )
              })}
            </m.div>
          </m.div>

          {/* RIGHT: Form */}
          <m.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {succeeded ? (
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                role="status"
                className="flex items-center gap-4 border border-rule bg-paper-deep p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center border border-terracotta bg-paper">
                  <Check size={24} className="text-terracotta-deep" />
                </span>
                <div>
                  <p className="text-lg font-semibold text-ink">Message sent!</p>
                  <p className="text-sm text-muted">Thanks for reaching out — I'll get back to you soon.</p>
                </div>
              </m.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-6">
                {/* Honeypot to prevent spam */}
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
                <input type="hidden" name="_captcha" value="true" />

                {/* Focusable error summary — shown after a failed submit */}
                {((showSummary && hasErrors) || submitError) && (
                  <div
                    ref={summaryRef}
                    tabIndex={-1}
                    role="alert"
                    aria-labelledby="form-error-title"
                    className="border border-terracotta bg-paper-deep p-4"
                  >
                    <p
                      id="form-error-title"
                      className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta-deep"
                    >
                      There is a problem
                    </p>
                    {hasErrors && (
                      <ul className="mt-2 space-y-1">
                        {(Object.entries(errors) as [FieldName, string | undefined][])
                          .filter(([, msg]) => Boolean(msg))
                          .map(([field, msg]) => (
                            <li key={field}>
                              <a
                                href={`#${field}`}
                                className="text-sm text-ink underline decoration-terracotta underline-offset-2 hover:text-terracotta-deep"
                              >
                                {msg}
                              </a>
                            </li>
                          ))}
                      </ul>
                    )}
                    {submitError && <p className="mt-2 text-sm text-ink-soft">{submitError}</p>}
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelCls}>
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => handleBlur('name')}
                      className={inputCls}
                      placeholder="Your name"
                    />
                    {errorText('name')}
                  </div>

                  <div>
                    <label htmlFor="email" className={labelCls}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={inputCls}
                      placeholder="you@example.com"
                    />
                    {errorText('email')}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelCls}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => handleBlur('message')}
                    className={`${inputCls} resize-y`}
                    placeholder="Tell me about your project or idea..."
                  />
                  {errorText('message')}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-terracotta hover:bg-terracotta-deep disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={15} />
                      </>
                    )}
                  </button>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    I'll respond within 24h
                  </span>
                </div>
              </form>
            )}
          </m.div>
        </div>
      </div>
    </section>
  )
}
