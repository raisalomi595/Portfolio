import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import ProjectsGrid from './components/ProjectsGrid'
import About from './components/About'
import Contact from './components/Contact'
import ResumeSection from './components/ResumeSection'
import Footer from './components/Footer'
import ProjectDetail from './components/ProjectDetail'

function Home() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <About />
      <ResumeSection />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  const location = useLocation()
  const isProjectPage = location.pathname.startsWith('/work')

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <Cursor />
        {!isProjectPage && <Header />}
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:id" element={<ProjectDetail />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen bg-paper flex items-center justify-center px-6">
                  <div className="text-center">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                      Folio not found
                    </p>
                    <h1 className="mt-3 font-display text-8xl font-semibold leading-none text-terracotta-deep">
                      404
                    </h1>
                    <div className="mx-auto mt-6 h-px w-24 bg-rule" aria-hidden="true" />
                    <p className="mt-6 font-body text-base text-ink-soft">
                      This page was never printed.
                    </p>
                    <a
                      href="/"
                      className="mt-6 inline-block border-b border-terracotta pb-0.5 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:text-terracotta-deep"
                    >
                      Return to the cover
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
      </LazyMotion>
    </MotionConfig>
  )
}
