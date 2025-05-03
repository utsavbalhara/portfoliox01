"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  
  // Smooth cursor motion values
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Apply spring physics for smooth motion
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    if (!mounted) return
    
    // Handle cursor position
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      
      // Check element under cursor for hover states
      const target = e.target as Element
      
      // Check for interactive elements
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.classList.contains("clickable") ||
        window.getComputedStyle(target).cursor === "pointer"
        
      setIsPointer(isInteractive)
      setIsHovering(isInteractive)
    }
    
    // Check for cursor style changes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (window.getComputedStyle(target).cursor === "pointer") {
        setIsPointer(true)
      }
    }
    
    const handleMouseOut = () => {
      setIsPointer(false)
    }
    
    // Hide the default cursor
    document.documentElement.classList.add("cursor-hidden")
    
    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mouseout", handleMouseOut)
    
    return () => {
      document.documentElement.classList.remove("cursor-hidden")
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mouseout", handleMouseOut)
    }
  }, [mounted, cursorX, cursorY])
  
  // Don't render on SSR or mobile
  if (!mounted || (typeof window !== "undefined" && window.innerWidth < 1024)) {
    return null
  }
  
  // Define cursor colors based on theme
  const dotColor = resolvedTheme === "dark" ? "bg-white" : "bg-black"
  const ringColor = resolvedTheme === "dark" ? "border-white" : "border-black"
  
  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          opacity: 0.8,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className={`h-2 w-2 rounded-full ${dotColor}`}></div>
      </motion.div>
      
      {/* Cursor ring/circle */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99] rounded-full pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? "40px" : "20px",
          height: isPointer ? "40px" : "20px",
          opacity: 0.2,
          scale: isHovering ? 1.2 : 1,
          borderWidth: "1px",
        }}
        transition={{ 
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        <div className={`w-full h-full rounded-full border ${ringColor} border-opacity-50 backdrop-blur-[2px]`} />
      </motion.div>
      
      {/* Magnetic cursor trailers */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 z-[98] rounded-full pointer-events-none"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: 1 - (i * 0.1),
            opacity: 0.1 - (i * 0.02),
          }}
          transition={{ 
            duration: 0.5,
            delay: i * 0.05,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <div className={`w-2 h-2 rounded-full ${dotColor}`} />
        </motion.div>
      ))}
    </>
  )
}
