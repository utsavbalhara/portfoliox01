"use client"

import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { Sparkles } from "lucide-react"
import React, { useState, useEffect, useRef } from "react"

// Playlist data with songs from the user's actual playlist
const playlistSongs = [
  { title: "As It Was", artist: "Harry Styles", album: "Harry's House" },
  { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
  { title: "SICKO MODE", artist: "Travis Scott", album: "ASTROWORLD" },
  { title: "Yes Indeed", artist: "Lil Baby & Drake", album: "Harder Than Ever" },
  { title: "Future Nostalgia", artist: "Dua Lipa", album: "Future Nostalgia" }
];

// Define particle type
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  scale: number;
}

// Define SubJourney Item type (NEW)
interface SubJourneyItem {
  id: string;
  title: string;
  detail?: string; // e.g., "Summer 2016", "AI Track Winner"
}

// Define Journey Item type (MODIFIED)
interface JourneyItem {
  id: string;
  year: string; 
  title: string; 
  description: string; 
  icon?: React.ReactNode; 
  subItems?: SubJourneyItem[]; // Optional array for concurrent achievements
}

// Updated journeyData with College sub-items
const journeyData: JourneyItem[] = [
  {
    id: "journey-0",
    year: "2024-Present", // User provided start year
    title: "Netaji Subhas University of Technology (NSUT)", 
    description: "B.Tech. Electronics and Communication Engineering", // Assuming B.Tech ECE
    subItems: [
      {
        id: "sub-0-1",
        title: "Won Hack on Hills", 
        detail: "NIT Hamirpur - 2025" 
      },
      {
        id: "sub-0-2",
        title: "Incoming SDE Intern", 
        detail: "May 2025 - July 2025" 
      }
    ]
  },
];

export default function AboutSection() {
  // Random song from playlist
  const [currentSong, setCurrentSong] = useState(playlistSongs[0]);
  const [songIndex, setSongIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  // Client-side only state
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Set up client-side only effects
  useEffect(() => {
    setIsClient(true);
    
    // Generate particles only on client-side
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 2,
        duration: Math.random() * 20 + 10,
        scale: Math.random() * 0.5 + 0.5
      }))
    );
  }, []);
  
  // Change song with animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSongIndex((prev) => (prev + 1) % playlistSongs.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    setCurrentSong(playlistSongs[songIndex]);
  }, [songIndex]);

  // Parallax effect for scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-animate py-20 scroll-section section-padding relative overflow-hidden"
    >
      {/* Animated background particles - client-side only */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-primary/5"
              initial={{ 
                x: `${particle.x}%`, 
                y: `${particle.y}%`,
                scale: particle.scale,
                width: `${particle.size}px`, 
                height: `${particle.size}px`
              }}
              animate={{ 
                y: [`${particle.y}%`, `${(particle.y + 20) % 100}%`, `${particle.y}%`],
                opacity: [0.1, 0.3, 0.1],
                scale: [particle.scale, particle.scale * 1.2, particle.scale]
              }}
              transition={{ 
                duration: particle.duration, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[length:20px_20px]" />
      </div>
      

      <motion.div 
        className="container px-4 mx-auto relative z-10"
        style={{ 
          y: parallaxY,
          opacity: parallaxOpacity
        }}
      >
        <div className="max-w-5xl mx-auto space-y-20">
          {/* Section heading - Enhanced animation */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2 
              className="heading-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              About{" "}
              <motion.span 
                className="gradient-text"
                initial={{ backgroundSize: "100%" }}
                animate={{ 
                  backgroundSize: ["100%", "200%", "100%"],
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                Me
              </motion.span>
            </motion.h2>
            <motion.div 
              className="h-[1px] w-32 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
            
            {/* Minimal Personal Info */}
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-2 text-sm text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span>Delhi, India</span>
              <span className="mx-1.5 opacity-50">•</span>
              <span>Full Stack Dev</span>
              <span className="mx-1.5 opacity-50">•</span>
              <span>INTJ-T</span>
            </motion.div>
          </motion.div>

          {/* Introduction - Bio only */}
          <div className="grid grid-cols-1 gap-y-8">
            {/* Bio content with typing animation */}
            <motion.div 
              className="space-y-6 max-w-2xl mx-auto text-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.p 
                className="text-lg md:text-xl font-light leading-relaxed text-foreground/90"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                I craft digital experiences that blend creativity with functionality. My approach combines clean code with intuitive design, turning complex problems into elegant solutions.
              </motion.p>
              
              <motion.p 
                className="text-base font-light leading-relaxed text-foreground/80"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                When I'm not building the web, you'll find me at the gym, exploring new coffee shops, or getting lost in cinematic universes.
              </motion.p>
            </motion.div>
          </div>
        
        
        </div>
      </motion.div>
    </section>
  );
}

// The RoadmapItemCard component is no longer used and has been removed.
