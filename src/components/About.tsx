import { motion } from 'framer-motion'
import { Code, Palette, Database, Globe, Layout, Server } from 'lucide-react'
import CodingScene from './CodingScene'

const skills = [
  { name: 'HTML & CSS', icon: Code },
  { name: 'JavaScript', icon: Code },
  { name: 'React', icon: Globe },
  { name: 'Vite', icon: Layout },
  { name: 'Tailwind CSS', icon: Palette },
  { name: 'Three.js', icon: Layout },
  { name: 'Node.js', icon: Server },
  { name: 'Git & GitHub', icon: Database },
]

export default function About() {
  return (
    <section id="about" className="bg-cream-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-ink-800 sm:text-4xl"
        >
          About me
        </motion.h2>

        {/* Coding scene decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8 w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden"
        >
          <CodingScene />
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base text-muted leading-relaxed">
              Hello, I am <span className="font-semibold text-ink-800">Soifon Rai</span>, an aspiring Web Developer with a strong interest in building modern, responsive, and interactive web applications.
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-base text-muted leading-relaxed"
            >
              I am currently expanding my knowledge of HTML, CSS, JavaScript, React, Vite, Tailwind CSS, and Three.js, with a focus on creating user-friendly and visually engaging digital experiences.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-4 text-base text-muted leading-relaxed"
            >
              I enjoy learning new technologies, solving problems, and continuously improving my skills through hands-on projects. I am seeking opportunities to gain industry experience, collaborate on meaningful projects, and grow as a professional developer.
            </motion.p>
          </motion.div>

          {/* Right: Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-ink-800 mb-6">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => {
                const Icon = skill.icon
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="inline-flex items-center gap-2 rounded-full bg-cream-100 border border-cream-300 px-4 py-2.5 text-sm font-medium text-ink-800 shadow-sm hover:shadow-md hover:border-terracotta-400 transition-all"
                  >
                    <Icon size={16} className="text-terracotta-500" />
                    {skill.name}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
