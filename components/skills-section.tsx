"use client"

import { motion } from "framer-motion"
import ParallaxSection from "@/components/parallax-section"
import { Smartphone, Globe, Layers } from "lucide-react"

interface ExpertiseArea {
  icon: React.ReactElement;
  title: string;
  skills: string[];
  description: string;
  highlightClass?: string;
}

// Reusable animation variant
const scrollFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.2, 0.65, 0.3, 0.9]
    }
  }
}

export default function SkillsSection() {
  const expertiseData: ExpertiseArea[] = [
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "App Dev",
      skills: ["Java", "Dart", "Kotlin", "Jetpack Compose", "Android Studio", "SwiftUI", "Xcode"],
      description: "Skilled in native mobile development for Android & iOS, creating performant, platform-specific user experiences. Proficient in cross-platform solutions with Dart/Flutter.",
      highlightClass: "text-primary",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Web Dev",
      skills: ["(mainly Frontend)", "React", "Next.js", "TypeScript", "JS", "HTML5", "CSS3", "Tailwind"],
      description: "Focused on building modern, responsive web interfaces using cutting-edge frontend technologies. Experience creating engaging and accessible user experiences.",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Core Skills & Tools",
      skills: ["Python", "DSA", "Linux", "Flask", "Bash", "C++", "Git", "GitHub", "Obsidian"],
      description: "Strong foundation in algorithms, data structures, system administration, and backend principles. Proficient with essential developer tools and version control.",
      highlightClass: "text-accent-foreground",
    },
  ]

  return (
    <section
      id="skills"
      className="section-animate py-24 scroll-section section-padding relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[length:50px_50px]" />
        {/* <div className="absolute top-[10%] right-[5%] w-72 h-72 bg-primary/5 rounded-full blur-[100px]" /> */}
        {/* <div className="absolute bottom-[15%] left-[10%] w-64 h-64 bg-secondary/5 rounded-full blur-[100px]" /> */}
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeUp}
        >
          <h2 className="heading-lg mb-4">
            My <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and areas I specialize in to bring ideas to life.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.13 }}
        >
          {expertiseData.map((area, index) => (
            <motion.div
              key={index}
              variants={scrollFadeUp}
              className="glass-card p-8 h-full flex flex-col border border-border/30 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:border-border/60 transition-all duration-300 ease-in-out relative group"
            >
              <div className="absolute inset-0 border-[3px] border-white/0 transition-all duration-300 ease-out group-hover:border-white/40 rounded-2xl group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]" />
              <div className="flex items-center mb-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-white/5 backdrop-blur-md border border-border/30 shadow-sm ${area.highlightClass ? area.highlightClass.replace('text-', 'bg-').replace('/90', '/10').replace('/100', '/10') : 'bg-primary/10'}`}
                >
                  {area.icon}
                </div>
                <h3 className={`text-2xl font-bold tracking-tight ${area.highlightClass || 'gradient-text'}`}>{area.title}</h3>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {area.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold shadow-sm border border-primary/20 transition-all duration-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <p className="text-base text-muted-foreground flex-grow leading-relaxed max-w-md">
                {area.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

