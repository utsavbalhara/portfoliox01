"use client"

import { motion } from "framer-motion"
import { Briefcase, School, Calendar, Award } from "lucide-react"

// Refined animation variant (subtler)
const scrollFadeUp = {
  hidden: { opacity: 0, y: 20 }, // Reduced y offset
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, // Slightly faster duration
      ease: [0.25, 0.1, 0.25, 1.0] // Standard ease
    }
  }
}

// Placeholder Data (Replace with your actual data)
const achievementsData = [
  {
    title: "First Place - University Hackathon 2023",
    description: "Developed a prize-winning application focused on sustainable urban planning.",
    icon: <Award className="w-4 h-4" />,
    date: "Oct 2023"
  },
  {
    title: "Open Source Contribution Award",
    description: "Recognized for significant contributions to the 'Awesome Project' library.",
    icon: <Award className="w-4 h-4" />,
    date: "Jan 2024"
  },
  {
    title: "Published Technical Article on Medium",
    description: "Authored an article on advanced React patterns, featured in 'Code Insights'.",
    icon: <Award className="w-4 h-4" />,
    date: "Mar 2024"
  }
];

const educationData = [
  {
    degree: "B.Tech in Computer Science",
    institution: "University Name",
    duration: "2020 - 2024",
    description: "Relevant coursework: Data Structures, Algorithms, Web Development, AI."
  },
  // Add more education if needed
];

export default function ExperienceSection() {
  return (
    <section 
      id="journey" // Changed ID
      className="py-24 scroll-section section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[length:50px_50px]" />
        <div className="absolute top-[15%] left-[5%] w-72 h-72 bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeUp}
        >
          <h2 className="heading-lg mb-4">
            My <span className="gradient-text">Journey</span> {/* Updated Heading */}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Highlights of my achievements and educational background.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Achievements Column */}
          <div> {/* Removed outer motion wrapper */} 
            <motion.h3 
              className="text-2xl font-bold mb-8 flex items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={scrollFadeUp}
            >
              <Award className="w-6 h-6 mr-3 text-primary" /> {/* Changed Icon */} 
              Achievements
            </motion.h3>
            <div className="space-y-6"> {/* Simple list/cards for achievements */} 
              {achievementsData.map((item, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-4 border border-border/30 hover:border-border/60"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
                  variants={scrollFadeUp}
                >
                   <div className="flex items-center justify-between mb-1">
                     <h4 className="font-semibold text-primary/90">{item.title}</h4>
                     <span className="text-xs text-muted-foreground flex items-center">
                       <Calendar className="w-3 h-3 mr-1 opacity-70" />
                       {item.date}
                     </span>
                   </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div> {/* Removed outer motion wrapper */} 
            <motion.h3 
              className="text-2xl font-bold mb-8 flex items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={scrollFadeUp}
            >
              <School className="w-6 h-6 mr-3 text-primary" />
              Education
            </motion.h3>
            <div className="relative pl-6 border-l border-border/50 space-y-8"> {/* Timeline style */} 
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  className="relative pl-6" // Indent content
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={scrollFadeUp}
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-background border-2 border-secondary" /> 
                  
                  <h4 className="text-lg font-semibold mb-0.5">{edu.degree}</h4>
                  <p className="text-sm text-primary font-medium mb-1">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground mb-2 flex items-center">
                    <Calendar className="w-3 h-3 mr-1.5 opacity-70" />
                    {edu.duration}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 