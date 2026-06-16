import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { projects, type Project } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

const filters = [
  { label: 'All', value: 'all' as const },
  { label: 'Frontend', value: 'frontend' as const },
  { label: 'Fullstack', value: 'fullstack' as const },
  { label: 'Design', value: 'design' as const },
]

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="bg-cream-100 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-ink-800 sm:text-4xl">
          Selected work
        </h2>
        <p className="mt-2 text-muted max-w-lg">
          A curated selection of projects spanning frontend, fullstack, and design.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                activeFilter === f.value
                  ? 'bg-ink-800 text-cream-100'
                  : 'bg-cream-200 text-muted hover:bg-cream-300 hover:text-ink-800'
              }`}
              aria-pressed={activeFilter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelected}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
