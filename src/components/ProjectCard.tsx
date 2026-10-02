import type { Project } from '../data/projects'

interface Props {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: Props) {
  const folio = String(index + 1).padStart(2, '0')

  return (
    <article className="group cursor-pointer">
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-12 md:items-center md:gap-8">
        {/* Folio number */}
        <div className="md:col-span-1">
          <span className="font-mono text-xs tracking-[0.2em] text-terracotta-deep transition-colors duration-300 group-hover:text-ink">
            {folio}
          </span>
        </div>

        {/* Entry */}
        <div className="md:col-span-6">
          <h3 className="font-display text-3xl leading-[1.05] text-ink transition-colors duration-300 group-hover:text-terracotta-deep md:text-4xl lg:text-[44px]">
            {project.title}
          </h3>
          <p className="mt-2.5 max-w-[52ch] font-body text-base leading-relaxed text-muted">
            {project.description}
          </p>
          <p className="mt-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            {project.type}
            <span className="mx-2 text-rule">/</span>
            {project.technologies.slice(0, 3).join(' · ')}
          </p>
          {/* Rule draws across on hover */}
          <span
            className="mt-4 block h-px w-full origin-left scale-x-0 bg-terracotta transition-transform duration-500 ease-out group-hover:scale-x-100"
            aria-hidden="true"
          />
        </div>

        {/* Plate */}
        <div className="md:col-span-5">
          <div className="aspect-[4/3] overflow-hidden border border-rule bg-paper-deep">
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover saturate-[0.85] transition-all duration-700 group-hover:scale-[1.03] group-hover:saturate-100"
            />
          </div>
        </div>
      </div>
    </article>
  )
}
