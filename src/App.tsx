import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
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
    <>
      {!isProjectPage && <Header />}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:id" element={<ProjectDetail />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-cream-100 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="font-mono text-4xl text-[#FF5C39]">404</h1>
                  <p className="mt-2 text-sm text-[#8B8174] font-mono">
                    Page not found.
                  </p>
                  <a
                    href="/"
                    className="mt-4 inline-block font-mono text-xs text-[#FF5C39] hover:underline"
                  >
                    Go home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  )
}
