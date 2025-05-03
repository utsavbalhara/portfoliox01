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
        // setIsPointer(true) // Already handled by mousemove
      }
    }
    
    const handleMouseOut = () => {
      // setIsPointer(false) // Already handled by mousemove
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
  const dotColor = resolvedTheme === "dark" ? "#FFFFFF" : "#000000"
  const ringColor = resolvedTheme === "dark" ? "border-white" : "border-black"
  
  // Styles for the main cursor dot, including triangle transformation
  const dotStyle = {
    height: isPointer ? '0px' : '8px',
    width: isPointer ? '0px' : '8px',
    backgroundColor: isPointer ? 'transparent' : dotColor,
    borderRadius: isPointer ? '0' : '9999px',
    borderLeft: isPointer ? '6px solid transparent' : '0px solid transparent', 
    borderRight: isPointer ? '6px solid transparent' : '0px solid transparent',
    borderBottom: isPointer ? `10px solid ${dotColor}` : '0px solid transparent',
  };

  return (
    <>
      {/* Main cursor dot - Now transforms into a triangle */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          ...dotStyle
        }}
        animate={{
          scale: isHovering ? (isPointer ? 1.2 : 0.5) : 1,
          opacity: isHovering ? 1 : 0.8,
        }}
        transition={{ duration: 0.15, type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Content removed as styling is handled by parent now */}
        {/* <div className={`h-2 w-2 rounded-full ${dotColor}`}></div> */}
      </motion.div>
      
      {/* Cursor ring/circle - Behaviour remains the same */}
      <motion.div
        ref={cursorRef}
        className={`fixed top-0 left-0 z-[99] rounded-full pointer-events-none border ${ringColor}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: resolvedTheme === "dark" ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
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
          type: "spring", stiffness: 300, damping: 25
        }}
      >
        {/* Ring content can stay simple */}
        {/* <div className={`w-full h-full rounded-full border ${ringColor} border-opacity-50 backdrop-blur-[2px]`} /> */}
      </motion.div>
      
      {/* Removed Magnetic cursor trailers */}
      {/* {Array.from({ length: 5 }).map((_, i) => (...) )} */}
    </>
  )
}
