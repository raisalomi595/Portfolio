import { useState } from 'react'
import { Download, Eye, X } from 'lucide-react'
import { motion } from 'framer-motion'

const RESUME_FILE = '/SalomiRai_CV.pdf'

export default function ResumeSection() {
  const [showViewer, setShowViewer] = useState(false)

  return (
    <section id="resume" className="bg-cream-50 py-24 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Left: Title and intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-terracotta-500 mb-4">
              Resumé
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink-800 leading-[1.1]">
              Background &amp; Experience
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed max-w-sm">
              My education, experience, and what I'm looking for in my next role.
            </p>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 space-y-8"
          >
            {/* Education */}
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-terracotta-500 mb-3">
                Education
              </p>
              <p className="text-lg font-semibold text-ink-800">
                Bsc (hons) Computing
              </p>
              <p className="text-sm text-muted">
                Itahari International College — 2024–2027
              </p>
            </div>

            {/* Experience */}
            <div className="pt-6 border-t border-cream-300">
              <p className="text-xs font-medium uppercase tracking-widest text-terracotta-500 mb-3">
                Experience
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <span className="block text-3xl font-bold text-ink-800">2+</span>
                  <span className="text-sm text-muted">Projects</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-ink-800">3+</span> 
                  <span className="text-sm text-muted">Year Learning.</span>
                </div>
              </div>
            </div>

            {/* Seeking */}
            <div className="pt-6 border-t border-cream-300">
              <p className="text-xs font-medium uppercase tracking-widest text-terracotta-500 mb-3">
                Seeking
              </p>
              <ul className="space-y-2">
                {[
                  'Junior Frontend Developer role',
                  'React & TypeScript opportunities',
                  'Collaborative team environment',
                  'Remote or hybrid work',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="text-terracotta-500 mt-0.5">*</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-cream-300 flex flex-wrap gap-4">
              <a
                href={RESUME_FILE}
                download
                className="inline-flex items-center gap-2 rounded-full bg-ink-800 px-5 py-2.5 text-sm font-semibold text-cream-100 transition-all hover:bg-ink-700"
              >
                <Download size={14} />
                Download CV
              </a>
              <button
                onClick={() => setShowViewer(true)}
                className="inline-flex items-center gap-2 rounded-full border border-ink-800 px-5 py-2.5 text-sm font-semibold text-ink-800 transition-all hover:bg-ink-800 hover:text-cream-100 cursor-pointer"
              >
                <Eye size={14} />
                View CV
              </button>
            </div>
          </motion.div>
        </div>

        {/* Inline PDF viewer */}
        {showViewer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-sm border border-cream-300 bg-white overflow-hidden"
          >
            <div className="flex items-center justify-between bg-cream-100 px-6 py-3 border-b border-cream-300">
              <span className="text-sm font-medium text-ink-800">SalomiRai_CV.pdf</span>
              <button
                onClick={() => setShowViewer(false)}
                className="p-1.5 rounded-full text-muted hover:text-ink-800 hover:bg-cream-200 transition-colors cursor-pointer"
                aria-label="Close viewer"
              >
                <X size={18} />
              </button>
            </div>
            <iframe
              src={RESUME_FILE}
              title="Resume PDF"
              className="w-full h-[80vh] max-h-[80vh]"
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
