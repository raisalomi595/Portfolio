import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { m } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import { useScrollTo } from '../hooks/useScrollTo'
import Footer from './Footer'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

const prose = 'space-y-4 text-[17px] leading-[1.7] text-ink-soft'
const dropCap =
  'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[56px] first-letter:font-semibold first-letter:leading-[0.78] first-letter:text-terracotta-deep'

function Section({
  num,
  title,
  children,
  wide = false,
  isDropCap = false,
}: {
  num: string
  title: string
  children: React.ReactNode
  wide?: boolean
  isDropCap?: boolean
}) {
  return (
    <section className="mx-auto mb-14 max-w-8xl px-6 md:px-10">
      <m.div {...fadeUp()} className="border-t border-rule pt-10">
        <div className={wide ? '' : 'grid gap-5 md:grid-cols-12 md:gap-8'}>
          <div className={wide ? '' : 'md:col-span-4 lg:col-span-3'}>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-terracotta-deep">
              § {num}
            </p>
            <h3 className="mt-2 font-display text-2xl leading-tight text-ink md:text-[26px]">
              {title}
            </h3>
          </div>
          <div
            className={
              wide
                ? 'mt-6'
                : `md:col-span-8 lg:col-span-9 ${isDropCap ? dropCap : ''}`
            }
          >
            {children}
          </div>
        </div>
      </m.div>
    </section>
  )
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const scrollTo = useScrollTo()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const backToIndex = () => {
    navigate('/')
    window.setTimeout(() => scrollTo('projects'), 150)
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Index of Work
          </p>
          <h1 className="mt-3 font-display text-6xl font-semibold text-terracotta-deep">
            Not found
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-rule" aria-hidden="true" />
          <Link
            to="/"
            className="mt-6 inline-block border-b border-terracotta pb-0.5 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:text-terracotta-deep"
          >
            Back to the index
          </Link>
        </div>
      </div>
    )
  }

  const folio = String(projects.findIndex((p) => p.id === project.id) + 1).padStart(2, '0')
  const nextProject = projects.find((p) => p.id === project.nextProjectId)

  return (
    <div className="min-h-screen bg-paper">
      {/* Running head */}
      <div className="fixed top-0 right-0 left-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-4 md:px-10">
          <button
            onClick={backToIndex}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-terracotta-deep cursor-pointer"
          >
            <ArrowLeft size={14} />
            Back to index
          </button>
          <span className="hidden font-mono text-xs uppercase tracking-[0.16em] text-terracotta-deep sm:block">
            {project.title}
          </span>
        </div>
      </div>

      {/* Title plate */}
      <section className="pt-28 pb-12 md:pb-16">
        <div className="mx-auto max-w-8xl px-6 md:px-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-terracotta-deep">
              Case Study — Folio {folio}
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[0.95] font-semibold text-ink md:text-7xl lg:text-8xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl font-body text-xl italic leading-snug text-muted md:text-2xl">
              {project.type}
            </p>
          </m.div>
        </div>
      </section>

      {/* Hero plate */}
      <m.figure
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto mb-14 max-w-8xl px-6 md:px-10"
      >
        <div className="aspect-video overflow-hidden border border-rule bg-paper-deep">
          {/* TODO: replace with a real screenshot of {project.title} */}
          <img src={project.image} alt="" className="h-full w-full object-cover" />
        </div>
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Fig. 01 — {project.title}
        </figcaption>
      </m.figure>

      {/* Masthead facts */}
      <div className="mx-auto mb-16 max-w-8xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-8 border-y border-rule py-8 md:grid-cols-3">
          {[
            { label: 'Role', value: project.role },
            { label: 'Timeline', value: project.timeline },
            { label: 'Type', value: project.type },
          ].map((fact) => (
            <m.div key={fact.label} {...fadeUp(0.1)}>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-terracotta-deep">
                {fact.label}
              </p>
              <p className="mt-2 text-base leading-relaxed text-ink">{fact.value}</p>
            </m.div>
          ))}
        </div>
      </div>

      {/* Article body */}
      <Section num="01" title="Overview" isDropCap>
        <div className={prose}>
          <p>{project.overview}</p>
        </div>
      </Section>

      <Section num="02" title="Problem Statement">
        <div className={prose}>
          <p>{project.problem}</p>
        </div>
      </Section>

      <Section num="03" title="Research & Planning">
        <div className={prose}>
          <p>{project.research}</p>
        </div>
      </Section>

      <Section num="04" title="Wireframes">
        <div className={prose}>
          <p>{project.wireframes}</p>
        </div>
      </Section>

      <Section num="05" title="UI Design">
        <div className={prose}>
          <p>{project.uiDesign}</p>
        </div>
      </Section>

      <Section num="06" title="Gallery" wide>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {project.gallery.map((img, i) => (
            <m.figure
              key={i}
              {...fadeUp(i * 0.1)}
              className="group"
            >
              <div className="aspect-[4/3] overflow-hidden border border-rule bg-paper-deep">
                {/* TODO: replace with real screenshots */}
                <img src={img} alt="" className="h-full w-full object-cover saturate-[0.9] transition-all duration-500 group-hover:saturate-100" />
              </div>
              <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Fig. {String(i + 2).padStart(2, '0')} — {project.title}
              </figcaption>
            </m.figure>
          ))}
        </div>
      </Section>

      <Section num="07" title="Development">
        <div className={prose}>
          <p>{project.development}</p>
        </div>
      </Section>

      <Section num="08" title="Architecture">
        <div className={prose}>
          <p>{project.architecture}</p>
        </div>
      </Section>

      <Section num="09" title="Technologies Used" wide>
        <m.div {...fadeUp()} className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="border border-rule bg-paper-deep px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft"
            >
              {tech}
            </span>
          ))}
        </m.div>
      </Section>

      <Section num="10" title="Key Features" wide>
        <m.ol {...fadeUp()} className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {project.features.map((feature, i) => (
            <li key={feature} className="flex items-start gap-4 border-b border-rule/70 pb-3">
              <span className="mt-0.5 font-mono text-[11px] tracking-[0.16em] text-terracotta-deep">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[17px] leading-snug text-ink-soft">{feature}</span>
            </li>
          ))}
        </m.ol>
      </Section>

      <Section num="11" title="Challenges Faced">
        <div className={prose}>
          <p>{project.challenges}</p>
        </div>
      </Section>

      <Section num="12" title="Solutions Implemented">
        <div className={prose}>
          <p>{project.solutions}</p>
        </div>
      </Section>

      <Section num="13" title="Results & Impact">
        <div className={prose}>
          <p>{project.results}</p>
        </div>
      </Section>

      <Section num="14" title="Lessons Learned">
        <div className={prose}>
          <p>{project.lessons}</p>
        </div>
      </Section>

      {(project.liveUrl || project.repoUrl) && (
        <Section num="15" title="Links" wide>
          <div className="flex flex-wrap gap-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-terracotta pb-0.5 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:text-terracotta-deep"
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
                className="inline-flex items-center gap-2 border-b border-rule pb-0.5 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:border-terracotta hover:text-terracotta-deep"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                Source Code
              </a>
            )}
          </div>
        </Section>
      )}

      {/* Next in the index */}
      {nextProject && (
        <section className="mx-auto mb-16 max-w-8xl px-6 md:px-10">
          <m.div {...fadeUp()} className="border-t border-rule pt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-terracotta-deep">
              Next in the index
            </p>
            <Link
              to={`/work/${nextProject.id}`}
              className="group mt-4 inline-flex items-center gap-4"
            >
              <span className="font-display text-4xl leading-none text-ink transition-colors duration-300 group-hover:text-terracotta-deep md:text-6xl">
                {nextProject.title}
              </span>
              <ArrowRight
                size={26}
                className="text-terracotta-deep transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </m.div>
        </section>
      )}

      <Footer />
    </div>
  )
}
