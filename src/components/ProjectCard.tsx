import type { Project } from '../data/projects'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className="group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative overflow-hidden border border-dashed border-[#FF5C39]/60 group-hover:border-[#FF5C39] transition-colors duration-500">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      {/* Title */}
      <div className="mt-5">
        <h3 className="font-mono text-sm tracking-wide text-[#FF5C39]">
          {project.title}
        </h3>
        <p className="mt-1.5 text-xs text-[#8B8174] font-light leading-relaxed">
          {project.type}
        </p>
      </div>
    </article>
  )
}
