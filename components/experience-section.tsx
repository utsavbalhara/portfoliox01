"use client"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Briefcase, School, Calendar, Award, ChevronDown } from "lucide-react"
import { useState, useRef } from "react"
import TimelineItem from "./TimelineItem"

// Refined animation variant (subtler)
const scrollFadeUp = {
  hidden: { opacity: 0, y: 20 }, // Reduced y offset
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, // Slightly faster duration
      ease: [0.16, 1, 0.3, 1] // Standard ease
    }
  }
}

// Updated Education Data
const educationData = [
  {
    degree: "B.Tech in Electronics and Communication Engineering",
    institution: "Netaji Subhas University of Technology (NSUT)",
    duration: "2024 - Present",
    description: "Pursuing a foundational degree in electronics and communication.",
    details: "Relevant coursework includes: Basic Electrical Engineering, Engineering Mathematics, Introduction to Programming. Actively involved in the university's Robotics Club and IEEE student chapter. Looking forward to specializing in VLSI Design and Embedded Systems in later years."
  },
  // Add more education if needed
];

// New Experience & Achievements Data
const experienceAndAchievementsData = [
  {
    type: "achievement",
    title: `Hackathon Winner - "Hack On Hills"`,
    institution: "NIT Hamirpur",
    date: "2025",
    description: "Secured first place in the 'Hack On Hills' hackathon, developing an innovative solution.",
    icon: <Award className="w-4 h-4 mr-2 text-primary/80" />,
    details: "Our team of 4 developed a project focusing on sustainable tourism in mountainous regions. The solution involved a mobile app for eco-friendly travel planning and a backend system for managing local resources. My role involved full-stack development using Python (Flask) for the backend and React Native for the mobile app. We were commended for the project's feasibility and potential impact."
  },
  {
    type: "internship",
    title: "Intern",
    institution: "Exam Centre and TnP, NSUT",
    date: "Ongoing", // Or specify actual duration
    description: "Contributing to the automation of processes and designing iOS/Android applications for students & teachers, alongside a web application for staff.",
    icon: <Briefcase className="w-4 h-4 mr-2 text-primary/80" />,
    details: "Key responsibilities include: \\n- Developing and maintaining features for a cross-platform mobile application using Flutter and Firebase for students and teachers, focusing on timetable management, announcements, and resource sharing. \\n- Assisting in the design and development of a web-based portal for administrative staff to streamline examination scheduling and placement activities, using React and Node.js. \\n- Participating in SCRUM meetings and contributing to the agile development lifecycle."
  }
  // Add more experiences or achievements if needed
];

// Placeholder for TimelineItem component - to be created in a new file
// const TimelineItem = ({ item }) => { /* ... component logic ... */ };

interface ExperienceSectionProps {
  disableTimelineHover?: boolean;
}

export default function ExperienceSection({ disableTimelineHover }: ExperienceSectionProps) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="journey"
      ref={sectionRef}
      className="section-animate py-24 scroll-section section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[length:50px_50px]" />
        <div className="absolute top-[15%] left-[5%] w-72 h-72 bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        className="container px-4 mx-auto relative z-10"
        style={{
          y: parallaxY,
          opacity: parallaxOpacity
        }}
      >
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollFadeUp}
        >
          <h2 className="heading-lg mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Highlights of my professional experience, achievements, and educational background.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
          {/* Experience & Achievements Column */}
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-8 flex items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={scrollFadeUp}
            >
              <Briefcase className="w-6 h-6 mr-3 text-primary" />
              Experience & Achievements
            </motion.h3>
            <div className="relative pl-6 border-l border-border/50">
              {experienceAndAchievementsData.map((item, index) => (
                <TimelineItem key={index} item={item} isEducation={false} isHoverDisabled={disableTimelineHover} />
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
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
            <div className="relative pl-6 border-l border-border/50">
              {educationData.map((edu, index) => (
                <TimelineItem key={index} item={edu} isEducation={true} isHoverDisabled={disableTimelineHover} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
} 