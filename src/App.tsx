import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import ProjectsGrid from './components/ProjectsGrid'
import About from './components/About'
import Contact from './components/Contact'
import ResumeSection from './components/ResumeSection'
import Footer from './components/Footer'

function Home() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <About />
      <ResumeSection />
      <Contact />
    </>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="*"
            element={
              <div className="min-h-screen bg-cream-100 flex items-center justify-center pt-24">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-ink-800">404</h1>
                  <p className="mt-2 text-muted">Page not found.</p>
                  <a
                    href="/"
                    className="mt-4 inline-block rounded-full bg-terracotta-500 px-6 py-2 text-sm font-semibold text-white"
                  >
                    Go home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
