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
    
    // Inject style to hide default cursor forcefully
    const styleId = "custom-cursor-hide-native";
    let styleElement = document.getElementById(styleId);
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.innerHTML = `
        .cursor-hidden * {
          cursor: none !important;
        }
      `;
      document.head.appendChild(styleElement);
    }
    
    return () => {
      document.documentElement.classList.remove("cursor-hidden")
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mouseout", handleMouseOut)
      
      // Remove injected style
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    }
  }, [mounted, cursorX, cursorY])
  
  // Don't render on SSR or mobile
  if (!mounted || (typeof window !== "undefined" && window.innerWidth < 1024)) {
    return null
  }
  
  // Use white for difference blend mode
  const cursorBaseColor = "#FFFFFF";
  const dotOpacityDefault = 0.8;
  const ringOpacityDefault = 0.3;
  
  // Styles for the main cursor dot
  const dotStyle = {
    // Make dot LARGER on hover
    height: isPointer ? '14px' : '10px', 
    width: isPointer ? '14px' : '10px', 
    backgroundColor: cursorBaseColor, 
    opacity: isPointer ? 0.9 : dotOpacityDefault, // Keep opacity high on hover for now
    borderRadius: '9999px', 
    mixBlendMode: 'difference', // Apply difference blend mode
  } as const; // Use 'as const' for type safety with mixBlendMode

  return (
    <>
      {/* Main cursor dot - Now shrinks on hover w/ blend mode */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          ...dotStyle
        }}
        animate={{
          scale: isHovering ? 1.1 : 1, 
          // Opacity now handled directly in dotStyle for simplicity
          // opacity: isPointer ? (isDarkMode ? 0.9 : 0.8) : (isDarkMode ? 0.8 : 0.7), 
        }}
        transition={{ duration: 0.15, type: "spring", stiffness: 500, damping: 30 }}
      />
      
      {/* Cursor ring/circle - Expands more on hover w/ blend mode */}
      <motion.div
        ref={cursorRef}
        // Removed theme-based border color class
        className={`fixed top-0 left-0 z-[99] rounded-full pointer-events-none border`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          // Use white border for difference blend mode
          borderColor: cursorBaseColor, 
          mixBlendMode: 'difference', // Apply difference blend mode
        }}
        animate={{
          // Keep width/height constant regardless of hover
          width: "30px", 
          height: "30px", 
          // Keep opacity constant regardless of hover
          opacity: ringOpacityDefault, 
          // Keep scale animation subtle
          scale: isHovering ? 1.05 : 1, 
          // Keep border width constant regardless of hover
          borderWidth: "1px", 
        }}
        transition={{ 
          duration: 0.25, 
          // Adjusted spring for smoother feel (less stiff, more damped)
          type: "spring", stiffness: 350, damping: 35 
        }}
      />
    </>
  )
}
