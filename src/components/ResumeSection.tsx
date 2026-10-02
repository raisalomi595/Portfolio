import { useState } from 'react'
import { Download, Eye, X } from 'lucide-react'
import { m } from 'framer-motion'

const RESUME_FILE = '/SalomiRai_CV.pdf'

const eyebrow = 'mb-3 font-mono text-xs uppercase tracking-[0.3em] text-terracotta-deep'

export default function ResumeSection() {
  const [showViewer, setShowViewer] = useState(false)

  return (
    <section id="resume" className="relative scroll-mt-20 overflow-hidden bg-paper-deep py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-8xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Left: Title and intro */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-terracotta-deep">
              Resumé
            </p>
            <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">
              Background &amp; Experience
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
              My education, experience, and what I'm looking for in my next role.
            </p>
          </m.div>

          {/* Right: Details */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8 md:col-span-3"
          >
            {/* Education */}
            <div>
              <p className={eyebrow}>Education</p>
              <p className="text-lg font-semibold text-ink">
                Bsc (hons) Computing
              </p>
              <p className="text-sm text-muted">
                Itahari International College — 2024–2027
              </p>
            </div>

            {/* Experience */}
            <div className="border-t border-rule pt-6">
              <p className={eyebrow}>Experience</p>
              <div className="flex items-center gap-10">
                <div>
                  <span className="block font-display text-4xl leading-none text-ink">
                    03
                  </span>
                  <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    Projects
                  </span>
                </div>
                <div className="h-10 w-px bg-rule" aria-hidden="true" />
                <div>
                  <span className="block font-display text-4xl leading-none text-ink">
                    2+
                  </span>
                  <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    Years learning
                  </span>
                </div>
              </div>
            </div>

            {/* Seeking */}
            <div className="border-t border-rule pt-6">
              <p className={eyebrow}>Seeking</p>
              <ul className="space-y-2">
                {[
                  'Junior Frontend Developer role',
                  'React & TypeScript opportunities',
                  'Collaborative team environment',
                  'Remote or hybrid work',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                    <span className="mt-0.5 text-terracotta-deep">*</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 border-t border-rule pt-6">
              <a
                href={RESUME_FILE}
                download
                className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-terracotta hover:bg-terracotta-deep"
              >
                <Download size={14} />
                Download CV
              </a>
              <button
                onClick={() => setShowViewer(true)}
                className="inline-flex items-center gap-2 border border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper cursor-pointer"
              >
                <Eye size={14} />
                View CV
              </button>
            </div>
          </m.div>
        </div>

        {/* Inline PDF viewer */}
        {showViewer && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 overflow-hidden border border-rule bg-white"
          >
            <div className="flex items-center justify-between border-b border-rule bg-paper px-6 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink">
                SalomiRai_CV.pdf
              </span>
              <button
                onClick={() => setShowViewer(false)}
                className="p-1.5 text-muted transition-colors hover:bg-paper-deep hover:text-ink cursor-pointer"
                aria-label="Close viewer"
              >
                <X size={18} />
              </button>
            </div>
            <iframe
              src={RESUME_FILE}
              title="Resume PDF"
              className="h-[80vh] max-h-[80vh] w-full"
            />
          </m.div>
        )}
      </div>
    </section>
  )
}
