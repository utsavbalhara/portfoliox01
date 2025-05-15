"use client"

import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { Code, Music, Film, Dumbbell, Coffee, Laptop, Sparkles } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// Playlist data with songs from the user's actual playlist
const playlistSongs = [
  { title: "As It Was", artist: "Harry Styles", album: "Harry's House" },
  { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
  { title: "SICKO MODE", artist: "Travis Scott", album: "ASTROWORLD" },
  { title: "Yes Indeed", artist: "Lil Baby & Drake", album: "Harder Than Ever" },
  { title: "Future Nostalgia", artist: "Dua Lipa", album: "Future Nostalgia" }
];

// Top artists from the user's playlist
const topArtists = ["The Weeknd", "Drake", "Travis Scott", "Lil Baby", "Future"];

// Gym PRs with current and goal weights
const gymPRs = [
  { name: "Deadlift", current: 120, goal: 150, unit: "kg" },
  { name: "Bench Press", current: 90, goal: 120, unit: "kg" },
  { name: "Squat", current: 110, goal: 140, unit: "kg" }
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
  
  // Personal interests with icons
  const interests = [
    { icon: <Code className="w-5 h-5" />, title: "Coding", description: "Full stack development" },
    { icon: <Music className="w-5 h-5" />, title: "Music", description: "Electronic to indie" },
    { icon: <Film className="w-5 h-5" />, title: "Cinema", description: "Film enthusiast" },
    { icon: <Dumbbell className="w-5 h-5" />, title: "Fitness", description: "Gym & mind-body balance" },
    { icon: <Coffee className="w-5 h-5" />, title: "Coffee", description: "Specialty brewing" },
    { icon: <Laptop className="w-5 h-5" />, title: "Open Source", description: "Contributing to projects" }
  ];

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
      
      {/* Atmospheric gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-[40%] -right-[20%] w-[90vw] h-[90vw] rounded-full"
          animate={{
            opacity: [0.02, 0.04, 0.02],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <motion.div 
          className="absolute -bottom-[50%] -left-[30%] w-[80vw] h-[80vw] rounded-full"
          animate={{
            opacity: [0.01, 0.03, 0.01],
            scale: [1, 1.08, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 60%)",
          }}
        />
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
              
              {/* Animated Music Integration */}
              <motion.div 
                className="mt-12 pt-12 border-t border-primary/5"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <div className="flex items-center space-x-5 mb-8">
                  <motion.div 
                    className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    <Music className="w-6 h-6 text-primary/60" />
                  </motion.div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSong.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">Now Playing</p>
                      <p className="text-lg">{currentSong.title}</p>
                      <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <motion.a 
                    href="https://music.apple.com/in/playlist/some-cwazy/pl.u-8aAVZglHmooylEX" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-full text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.15)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    some cwazy 🔥
                  </motion.a>
                  {topArtists.map((artist, index) => (
                    <motion.span 
                      key={index} 
                      className="text-xs bg-primary/5 px-4 py-2 rounded-full text-muted-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ y: -3, backgroundColor: "rgba(var(--primary), 0.1)" }}
                    >
                      {artist}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Gym PRs - Animated progress bars */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            {gymPRs.map((pr, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">{pr.name}</p>
                <div className="flex items-baseline space-x-2">
                  <motion.span 
                    className="text-4xl font-light"
                    initial={{ opacity: 0 }}
                    animate={isInView ? 
                      { opacity: 1, scale: [0.9, 1.1, 1] } : 
                      { opacity: 0 }
                    }
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                  >
                    {pr.current}
                  </motion.span>
                  <span className="text-muted-foreground text-lg">/</span>
                  <span className="text-muted-foreground text-lg">{pr.goal} {pr.unit}</span>
                </div>
                <div className="mt-4 h-[6px] bg-primary/10 overflow-hidden rounded-full">
                  <motion.div 
                    className="h-full bg-primary/50"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${(pr.current / pr.goal) * 100}%` } : { width: 0 }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.5 + index * 0.3, 
                      ease: "easeOut" 
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Film - Enhanced interactive element */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center flex-shrink-0"
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Film className="w-8 h-8 text-primary/60" />
            </motion.div>
            
            <div className="flex-grow">
              <motion.p 
                className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Cinema Obsession
              </motion.p>
              <motion.p 
                className="text-lg font-light mb-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Avid film enthusiast with a growing collection of reviews and ratings.
              </motion.p>
              <motion.a 
                href="https://letterboxd.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm bg-primary/5 hover:bg-primary/10 px-6 py-3 rounded-full text-foreground inline-block transition-colors duration-300"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(var(--primary), 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <Film className="w-4 h-4 mr-3" />
                  </motion.div>
                  <span>Letterboxd Profile</span>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Interests - Staggered and interactive cards */}
          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center max-w-md mx-auto">
              <motion.p 
                className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                Interests & Passions
              </motion.p>
              <motion.p 
                className="text-lg font-light text-foreground/80"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                A glimpse into the things that drive me beyond coding
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
              {interests.map((item, index) => {
                // Create a varied layout that feels intentional
                const sizes = [
                  "md:col-span-6", // Coding
                  "md:col-span-3", // Music
                  "md:col-span-3", // Cinema
                  "md:col-span-4", // Fitness
                  "md:col-span-4", // Coffee
                  "md:col-span-4", // Open Source
                ];

                return (
                  <motion.div 
                    key={index}
                    className={`group ${sizes[index]}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ 
                      scale: 1.03,
                      y: -5
                    }}
                  >
                    <motion.div 
                      className="bg-card/30 hover:bg-card/40 backdrop-blur-sm p-6 rounded-2xl h-full transition-all duration-300"
                      whileHover={{ 
                        boxShadow: "0 10px 30px -15px rgba(var(--primary), 0.15)"
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <motion.div 
                          className="w-8 h-8 flex items-center justify-center text-primary mr-4 transition-all duration-300 group-hover:text-primary"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0, -5, 0]
                          }}
                          transition={{ 
                            duration: 6, 
                            delay: index * 0.2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          {item.icon}
                        </motion.div>
                        <h4 className="text-lg">{item.title}</h4>
                      </div>
                      <p className="text-muted-foreground font-light group-hover:text-foreground transition-colors duration-300">
                        {item.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          
          {/* Sparkles effect - client-side only */}
          {isClient && (
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 5 }}
            >
              {Array.from({ length: 15 }).map((_, i) => {
                const left = i * 6.67; // Deterministic positions instead of random
                const top = (i * 7.5) % 100;
                const delay = i * 1.2;
                
                return (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: delay,
                      repeat: Infinity,
                      repeatDelay: 10,
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-primary/50" />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
