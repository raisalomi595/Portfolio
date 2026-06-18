import { useState } from 'react'
import { motion } from 'framer-motion'
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

const stagger = (i: number) => ({ delay: i * 0.08 })

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [succeeded, setSucceeded] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
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
    } catch {
      setError('Failed to send. Please email me directly at raisalomi595@gmail.com')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-cream-100 py-24 md:py-32 overflow-hidden scroll-mt-20">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-5">
          {/* LEFT: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-sm font-medium uppercase tracking-widest text-terracotta-500 mb-2"
            >
              Let's Connect
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-800 leading-[1.15]"
            >
              I'm currently seeking internship opportunities and looking to grow my experience in web development.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-base text-muted leading-relaxed"
            >
              Whether you have a project, collaboration opportunity, or simply want to connect, I'd be happy to hear from you.
            </motion.p>

            {/* Contact details */}
            <div className="mt-8 space-y-3">
              {contactInfo.map((item, i) => {
                const Icon = item.icon
                const content = (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ...stagger(i) }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-200 text-terracotta-500">
                      <Icon size={15} />
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-muted hover:text-ink-800 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-muted">{item.value}</span>
                    )}
                  </motion.div>
                )
                return <div key={item.label}>{content}</div>
              })}
            </div>

            {/* Social links */}
            <motion.div
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
                    className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-terracotta-500 transition-colors group"
                  >
                    <Icon size={16} />
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </a>
                )
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {succeeded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 rounded-2xl bg-cream-200 border border-cream-300 p-8"
                role="status"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta-500/10">
                  <Check size={24} className="text-terracotta-500" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-ink-800">Message sent!</p>
                  <p className="text-sm text-muted">Thanks for reaching out — I'll get back to you soon.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
                {/* Honeypot to prevent spam */}
                <input type="text" name="_honey" className="hidden" />
                <input type="hidden" name="_captcha" value="true" />

                <div className="grid gap-5 sm:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-ink-800 mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      aria-required="true"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3.5 text-sm text-ink-800 placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-terracotta-400/40 focus:border-terracotta-400 transition-all"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-ink-800 mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      aria-required="true"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3.5 text-sm text-ink-800 placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-terracotta-400/40 focus:border-terracotta-400 transition-all"
                      placeholder="you@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-ink-800 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3.5 text-sm text-ink-800 placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-terracotta-400/40 focus:border-terracotta-400 transition-all resize-y"
                    placeholder="Tell me about your project or idea..."
                  />
                </motion.div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="flex items-center gap-3"
                >
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-terracotta-600 hover:shadow-lg hover:shadow-terracotta-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={15} />
                      </>
                    )}
                  </button>
                  <span className="text-xs text-muted">I'll respond within 24h</span>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
