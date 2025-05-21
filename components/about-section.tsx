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
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  // Client-side only state
  const [isClient, setIsClient] = useState(false);
  
  // Set up client-side only effects
  useEffect(() => {
    setIsClient(true);
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
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-animate py-24 scroll-section section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[length:50px_50px]" />
        {/* <div className="absolute top-[15%] left-[5%] w-72 h-72 bg-secondary/5 rounded-full blur-[100px]" /> */}
        {/* <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-[100px]" /> */}
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scrollFadeUp}
          >
            <motion.h2 
              className="heading-lg mb-6"
              variants={scrollFadeUp}
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
              variants={scrollFadeUp}
            />
            
            {/* Minimal Personal Info */}
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-2 text-sm text-muted-foreground mb-8"
              variants={scrollFadeUp}
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
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scrollFadeUp}
            >
              <motion.p 
                className="text-lg md:text-xl font-light leading-relaxed text-foreground/90"
                variants={scrollFadeUp}
              >
                I craft digital experiences that blend creativity with functionality. My approach combines clean code with intuitive design, turning complex problems into elegant solutions.
              </motion.p>
              
              <motion.p 
                className="text-lg md:text-xl font-light leading-relaxed text-foreground/80"
                variants={scrollFadeUp}
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
