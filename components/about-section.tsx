"use client"

import { motion } from "framer-motion"
// Remove useInView and related state if not needed elsewhere
// import { useInView } from "react-intersection-observer"
// import { useState, useEffect } from "react"
import { Code, BookOpen, Coffee, Github } from "lucide-react"

// Define reusable animation variants for scroll-triggered effects
const scrollFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
}

const scrollScaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.2, 0.65, 0.3, 0.9]
    }
  }
}

export default function AboutSection() {
  // Removed useInView hook

  const highlights = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Development",
      description: "Skilled in both frontend and backend technologies with a focus on creating efficient, scalable solutions."
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Learning",
      description: "Constantly expanding my knowledge and staying updated with the latest industry trends and technologies."
    },
    {
      icon: <Github className="w-5 h-5" />,
      title: "Open Source",
      description: "Active contributor to open source projects, sharing knowledge with the developer community."
    },
    {
      icon: <Coffee className="w-5 h-5" />,
      title: "Work Ethic",
      description: "Committed to delivering high-quality work with attention to detail and meeting deadlines."
    }
  ]

  return (
    <section 
      id="about" 
      // Removed ref={ref}
      className="py-24 scroll-section section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[length:50px_50px]" />
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* No need for the outer motion container anymore */}
        <div className="max-w-6xl mx-auto">
          {/* Animate heading block */}
          <motion.div 
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scrollFadeUp}
          >
            <h2 className="heading-lg mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A glimpse into who I am and what drives my passion for development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
            {/* Animate Image block */}
            <motion.div 
              className="relative order-2 md:order-1 flex justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scrollScaleUp} // Use scale animation for image
            >
              <div className="relative w-[80%] max-w-sm">
                <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl transform rotate-3 scale-105" />
                <div className="absolute inset-0 bg-card/30 backdrop-blur-sm border border-primary/10 rounded-2xl transform -rotate-3 scale-105" />
                
                <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card/40 backdrop-blur-md shadow-xl">
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt="Professional headshot"
                    className="w-full aspect-square object-cover"
                  />
                  
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h3 className="text-xl font-bold">Aryaman Jaiswal</h3>
                    <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Animate Content block */}
            <div className="order-1 md:order-2">
              {/* Animate text paragraphs individually */}
              <motion.div
                className="space-y-6 text-muted-foreground"
                transition={{ staggerChildren: 0.1 }} 
              >
                <motion.p variants={scrollFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                  I'm a passionate full-stack developer with a keen eye for design and a commitment to creating intuitive, efficient digital solutions. With expertise in modern web technologies, I build responsive, accessible, and performant applications.
                </motion.p>
                <motion.p variants={scrollFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                  My journey in tech began with curiosity about how things work, which evolved into a deep appreciation for the art and science of software development. I believe in writing clean, maintainable code and staying current with emerging technologies.
                </motion.p>
                <motion.p variants={scrollFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                  When I'm not coding, you can find me exploring nature trails, experimenting with new recipes, or contributing to open-source projects. I'm always eager to take on new challenges and collaborate on innovative solutions.
                </motion.p>
              </motion.div>

              {/* Animate Highlights grid */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={scrollFadeUp} // Apply base fade-up to the grid container
                // Stagger animation for individual highlight cards
                transition={{ staggerChildren: 0.1 }} 
              >
                {highlights.map((item, index) => (
                  // Apply item animation variant here
                  <motion.div
                    key={index}
                    variants={scrollFadeUp} // Each card fades up
                    className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:bg-card/50 hover:border-border transition-all duration-300"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        {item.icon}
                      </div>
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
