import { useState } from 'react'
import { Download, Eye, X, GraduationCap, Briefcase, Target, Code } from 'lucide-react'

const RESUME_FILE = '/SalomiRai_CV.pdf'

export default function ResumeSection() {
  const [showViewer, setShowViewer] = useState(false)

  return (
    <section id="resume" className="bg-cream-50 py-24 border-b border-cream-300">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-ink-800 sm:text-4xl">
          Resume
        </h2>
        <p className="mt-2 text-muted max-w-lg">
          My background, experience, and what I'm looking for.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Education */}
          <div className="rounded-2xl bg-cream-100 border border-cream-300 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-terracotta-500/10 p-2.5">
                <GraduationCap size={20} className="text-terracotta-500" />
              </div>
              <h3 className="text-lg font-semibold text-ink-800">Education</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-base font-medium text-ink-800">Bsc (hons) Computing</p>
                <p className="text-xs text-muted">Itahari International College — 2024–2027</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="rounded-2xl bg-cream-100 border border-cream-300 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-terracotta-500/10 p-2.5">
                <Briefcase size={20} className="text-terracotta-500" />
              </div>
              <h3 className="text-lg font-semibold text-ink-800">Experience</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-6 mt-3 pt-3 border-t border-cream-300">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-terracotta-500">2</span>
                  <span className="text-xs text-muted">Projects</span>
                </div>
                
                <div className="text-center">
                  <span className="block text-2xl font-bold text-terracotta-500">6</span>
                  <span className="text-xs text-muted">Months Exp.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seeking */}
          <div className="rounded-2xl bg-cream-100 border border-cream-300 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-terracotta-500/10 p-2.5">
                <Target size={20} className="text-terracotta-500" />
              </div>
              <h3 className="text-lg font-semibold text-ink-800">Seeking</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Code size={14} className="text-terracotta-500 mt-0.5 shrink-0" />
                <p className="text-sm text-muted">Junior Frontend Developer role</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Code size={14} className="text-terracotta-500 mt-0.5 shrink-0" />
                <p className="text-sm text-muted">Opportunity to work with React & TypeScript</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Code size={14} className="text-terracotta-500 mt-0.5 shrink-0" />
                <p className="text-sm text-muted">Collaborative team environment</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Code size={14} className="text-terracotta-500 mt-0.5 shrink-0" />
                <p className="text-sm text-muted">Remote or hybrid work</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href={RESUME_FILE}
            download
            className="inline-flex items-center gap-2 rounded-full bg-ink-800 px-6 py-3 text-sm font-semibold text-cream-100 transition-all hover:bg-ink-700"
            aria-label="Download resume as PDF"
          >
            <Download size={16} />
            Download CV
          </a>
          <button
            onClick={() => setShowViewer(true)}
            className="inline-flex items-center gap-2 rounded-full border border-ink-800 px-6 py-3 text-sm font-semibold text-ink-800 transition-all hover:bg-ink-800 hover:text-cream-100 cursor-pointer"
            aria-label="View resume online"
          >
            <Eye size={16} />
            View CV
          </button>
        </div>

        {/* Inline PDF viewer */}
        {showViewer && (
          <div className="mt-10 rounded-2xl border border-cream-300 bg-white overflow-hidden">
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
              className="w-full h-[80vh]"
            />
          </div>
        )}
      </div>
    </section>
  )
}
