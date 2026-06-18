import { motion } from 'framer-motion'
import { Download, Mail } from 'lucide-react'

const RESUME_FILE = '/SalomiRai_CV.pdf'

const skillsList = [
  'React.js',
  'TypeScript',
  'Tailwind CSS',
  'Java',
  'MySQL',
  'JavaScript',
  'HTML & CSS',
  'Git & GitHub',
]

export default function About() {
  return (
    <section id="about" className="bg-cream-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-cream-200">
              <img
                src="/img1.jpg"
                alt="Salomi Rai"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 flex flex-col justify-center"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-terracotta-500 mb-4">
              About
            </p>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink-800 leading-[1.1]">
              Salomi Rai
            </h2>
            <p className="text-base text-muted mt-1">
              But you can call me Soifon.
            </p>

            <div className="mt-6 space-y-4 text-base text-muted leading-relaxed max-w-xl">
              <p>
                I'm a Web Developer with a strong interest in building modern,
                responsive, and interactive web applications. I enjoy the space
                where logic meets design — turning complex problems into simple,
                beautiful digital experiences.
              </p>
              <p>
                Currently expanding my knowledge of React, TypeScript, Java, and
                full-stack development. I believe in writing clean code,
                creating accessible interfaces, and continuously learning.
              </p>
              <p>
                I'm seeking opportunities to collaborate on meaningful projects,
                gain industry experience, and grow as a developer.
              </p>
            </div>

            {/* Skills inline */}
            <div className="mt-6 flex flex-wrap gap-x-1 gap-y-1 text-sm text-ink-800">
              {skillsList.map((skill, i) => (
                <span key={skill}>
                  {i > 0 && <span className="text-terracotta-500 mx-2">◍</span>}
                  {skill}
                </span>
              ))}
            </div>

            {/* Resume link */}
            <div className="mt-8">
              <a
                href={RESUME_FILE}
                download
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-800 border-b border-ink-800 pb-0.5 hover:text-terracotta-500 hover:border-terracotta-500 transition-colors"
              >
                <Download size={14} />
                Download Resumé
              </a>
            </div>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-4 text-muted">
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
            </div>

            {/* Currently */}
            <div className="mt-10 pt-8 border-t border-cream-300">
              <p className="text-xs font-medium uppercase tracking-widest text-terracotta-500 mb-3">
                Currently
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
                <span>
                  <span className="text-ink-800 font-medium">Building</span>{' '}
                  SecondHome & PeerLearn
                </span>
                <span>
                  <span className="text-ink-800 font-medium">Learning</span>{' '}
                  Java & MySQL
                </span>
                <span>
                  <span className="text-ink-800 font-medium">Reading</span>{' '}
                  Clean Code
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
