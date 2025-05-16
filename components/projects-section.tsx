"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  githubUrl: string
}

// Reusable animation variant
const scrollFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

// Add new prop type for onVisibilityChange
interface ProjectsSectionProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

export default function ProjectsSection({ onVisibilityChange }: ProjectsSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const projects: Project[] = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with product catalog, shopping cart, and secure checkout process.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description:
        "A productivity application for organizing tasks with drag-and-drop functionality and team collaboration features.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Weather Dashboard",
      description:
        "An interactive weather application providing real-time forecasts and historical weather data visualization.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Chart.js", "Weather API", "Styled Components"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  // Call the callback when inView status changes
  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(inView);
    }
  }, [inView, onVisibilityChange]);

  return (
    <section 
      id="projects" 
      ref={ref}
      className="section-animate py-24 scroll-section section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[length:50px_50px]" />
        {/* <div className="absolute top-[5%] right-[15%] w-64 h-64 bg-primary/5 rounded-full blur-[100px]" /> */}
        {/* <div className="absolute bottom-[10%] left-[20%] w-72 h-72 bg-secondary/5 rounded-full blur-[100px]" /> */}
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work showcasing my skills and expertise in building modern web applications.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={scrollFadeUp}
              className="h-full"
            >
              <Card className="project-card h-full flex flex-col overflow-hidden">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-70" />
                  
                  {/* Tags */}
                  <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="badge badge-primary text-xs px-2.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 gradient-text-alt">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">{project.description}</p>

                  <div className="flex gap-3 mt-auto">
                    <Button
                      size="sm"
                      className="fill-center-button !py-1.5 !px-3 text-sm flex items-center gap-1.5"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="fill-center-button !py-1.5 !px-3 text-sm flex items-center gap-1.5"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <Button
            className="fill-center-button group"
            asChild
          >
            <a href="#" className="flex items-center">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
