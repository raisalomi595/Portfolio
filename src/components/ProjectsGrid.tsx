import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

export default function ProjectsGrid() {

  return (
    <section
      id="projects"
      className="bg-[#ECE8DC] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-mono text-xs tracking-[0.2em] text-[#FF5C39] uppercase">
            Selected work | Project
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-16 md:gap-y-20">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={i === 0 ? 'lg:col-span-3 lg:row-span-1' : 'lg:col-span-2'}
            >
              <Link to={`/work/${project.id}`} className="block group">
                <ProjectCard project={project} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
