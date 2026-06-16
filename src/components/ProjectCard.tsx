import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useTilt } from '../hooks/useTilt'
import type { Project } from '../data/projects'

interface Props {
  project: Project
  onSelect: (project: Project) => void
}

export default function ProjectCard({ project, onSelect }: Props) {
  const tilt = useTilt(6)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative rounded-2xl bg-cream-50 border border-cream-300 overflow-hidden cursor-pointer"
      {...tilt}
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(project)
        }
      }}
    >
      <div className="aspect-video overflow-hidden" style={{ transform: 'translateZ(30px)' }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-lg font-semibold text-ink-800">{project.title}</h3>
        <p className="mt-1 text-sm text-muted line-clamp-2">{project.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream-200 px-2.5 py-0.5 text-xs font-medium text-ink-700"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="rounded-full bg-cream-200 px-2.5 py-0.5 text-xs font-medium text-muted">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div
          className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ transform: 'translateZ(40px)' }}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-medium text-terracotta-500 hover:text-terracotta-600 transition-colors"
              aria-label={`${project.title} live site`}
            >
              <ExternalLink size={14} />
              Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink-800 transition-colors"
              aria-label={`${project.title} repository`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
