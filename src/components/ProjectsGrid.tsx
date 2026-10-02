import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

export default function ProjectsGrid() {
  return (
    <section id="projects" className="bg-paper-deep py-24 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        {/* Section head */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-16"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-terracotta-deep">
              Selected work
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none text-ink md:text-7xl">
              Index of Work
            </h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {String(projects.length).padStart(2, '0')} entries
          </p>
        </m.div>

        {/* Index rows */}
        <div className="border-b border-rule">
          {projects.map((project, i) => (
            <m.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border-t border-rule"
            >
              <Link to={`/work/${project.id}`} className="block group">
                <div className="py-7 md:py-9">
                  <ProjectCard project={project} index={i} />
                </div>
              </Link>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
