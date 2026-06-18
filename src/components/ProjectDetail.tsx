import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import Footer from './Footer'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return (
      <div className="min-h-screen bg-[#ECE8DC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-mono text-2xl text-[#FF5C39]">Project not found</h1>
          <Link
            to="/"
            className="mt-4 inline-block font-mono text-sm text-[#8B8174] hover:text-[#FF5C39] transition-colors"
          >
    Back to work
          </Link>
        </div>
      </div>
    )
  }

  const nextProject = projects.find((p) => p.id === project.nextProjectId)

  return (
    <div className="min-h-screen bg-[#ECE8DC]">
      {/* Back navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#ECE8DC]/90 backdrop-blur-sm border-b border-dashed border-[#FF5C39]/20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-4 flex items-center justify-between">
          <Link
            to="/#projects"
            className="font-mono text-xs text-[#8B8174] hover:text-[#FF5C39] transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            Back to work
          </Link>
          <span className="font-mono text-xs text-[#FF5C39]">{project.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-16 pb-12 md:pb-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs tracking-[0.2em] text-[#FF5C39] uppercase mb-6">
              Case Study
            </p>
            <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl text-[#FF5C39] leading-[1.05] tracking-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-sm text-[#8B8174] font-mono max-w-xl">
              {project.type}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto max-w-7xl px-6 md:px-10 mb-16"
      >
        <div className="aspect-video overflow-hidden border border-dashed border-[#FF5C39]/40">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Project Info Bar */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-dashed border-[#FF5C39]/20 pt-10">
          <motion.div {...fadeUp(0.1)}>
            <motion.h3 {...fadeIn} className="font-mono text-xs tracking-[0.2em] text-[#FF5C39] uppercase mb-4">Role</motion.h3>
            <p className="text-sm text-[#3D3830] leading-relaxed">{project.role}</p>
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <motion.h3 {...fadeIn} className="font-mono text-xs tracking-[0.2em] text-[#FF5C39] uppercase mb-4">Timeline</motion.h3>
            <p className="text-sm text-[#3D3830] leading-relaxed">{project.timeline}</p>
          </motion.div>
          <motion.div {...fadeUp(0.3)}>
            <motion.h3 {...fadeIn} className="font-mono text-xs tracking-[0.2em] text-[#FF5C39] uppercase mb-4">Type</motion.h3>
            <p className="text-sm text-[#3D3830] leading-relaxed">{project.type}</p>
          </motion.div>
        </div>
      </div>

      {/* Overview */}
      <Section>
        <Inner>
          <Heading>Overview</Heading>
          <Body>{project.overview}</Body>
        </Inner>
      </Section>

      {/* Problem */}
      <Section>
        <Inner>
          <Heading>Problem Statement</Heading>
          <Body>{project.problem}</Body>
        </Inner>
      </Section>

      {/* Research */}
      <Section>
        <Inner>
          <Heading>Research & Planning</Heading>
          <Body>{project.research}</Body>
        </Inner>
      </Section>

      {/* Wireframes */}
      <Section>
        <Inner>
          <Heading>Wireframes</Heading>
          <Body>{project.wireframes}</Body>
        </Inner>
      </Section>

      {/* UI Design */}
      <Section>
        <Inner>
          <Heading>UI Design</Heading>
          <Body>{project.uiDesign}</Body>
        </Inner>
      </Section>

      {/* Gallery */}
      <Section>
        <Heading>Gallery</Heading>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="aspect-[4/3] overflow-hidden border border-dashed border-[#FF5C39]/40"
            >
              <img
                src={img}
                alt={`${project.title} gallery ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Development */}
      <Section>
        <Inner>
          <Heading>Development</Heading>
          <Body>{project.development}</Body>
        </Inner>
      </Section>

      {/* Architecture */}
      <Section>
        <Inner>
          <Heading>Architecture</Heading>
          <Body><p>{project.architecture}</p></Body>
        </Inner>
      </Section>

      {/* Technologies */}
      <Section>
        <Heading>Technologies Used</Heading>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-4 flex flex-wrap gap-x-6 gap-y-3"
        >
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-sm text-[#3D3830] relative after:content-[','] last:after:content-['']"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </Section>

      {/* Key Features */}
      <Section>
        <Inner>
          <Heading>Key Features</Heading>
          <Body>
            <ul className="space-y-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-[#FF5C39] mt-0.5">*</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Body>
        </Inner>
      </Section>

      {/* Challenges */}
      <Section>
        <Inner>
          <Heading>Challenges Faced</Heading>
          <Body>{project.challenges}</Body>
        </Inner>
      </Section>

      {/* Solutions */}
      <Section>
        <Inner>
          <Heading>Solutions Implemented</Heading>
          <Body>{project.solutions}</Body>
        </Inner>
      </Section>

      {/* Results */}
      <Section>
        <Inner>
          <Heading>Results & Impact</Heading>
          <Body>{project.results}</Body>
        </Inner>
      </Section>

      {/* Lessons */}
      <Section>
        <Inner>
          <Heading>Lessons Learned</Heading>
          <Body>{project.lessons}</Body>
        </Inner>
      </Section>

      {/* Links */}
      {(project.liveUrl || project.repoUrl) && (
        <Section>
          <div className="flex flex-wrap gap-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-[#FF5C39] hover:underline flex items-center gap-2"
              >
                <ExternalLink size={14} />
                View Live Project
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-[#3D3830] hover:text-[#FF5C39] transition-colors flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                Source Code
              </a>
            )}
          </div>
        </Section>
      )}

      {/* Next Project */}
      {nextProject && (
        <Section noBorder={false}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs tracking-[0.2em] text-[#8B8174] uppercase mb-4">
              Next Project
            </p>
            <Link
              to={`/work/${nextProject.id}`}
              className="group inline-flex items-center gap-3"
            >
              <span className="font-mono text-3xl md:text-4xl text-[#FF5C39] group-hover:underline underline-offset-4 transition-all">
                {nextProject.title}
              </span>
              <ArrowRight
                size={20}
                className="text-[#FF5C39] group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </Section>
      )}

      <Footer />
    </div>
  )
}

function Section({ children, noBorder = true }: { children: React.ReactNode; noBorder?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 mb-16">
      <div className={noBorder ? 'border-t border-dashed border-[#FF5C39]/20 pt-10' : 'pt-10'}>
        {children}
      </div>
    </section>
  )
}

function Inner({ children }: { children: React.ReactNode }) {
  return <div className="max-w-2xl">{children}</div>
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h3
      {...fadeIn}
      className="font-mono text-xs tracking-[0.2em] text-[#FF5C39] uppercase mb-4"
    >
      {children}
    </motion.h3>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-sm text-[#3D3830] leading-relaxed space-y-4"
    >
      {children}
    </motion.div>
  )
}
