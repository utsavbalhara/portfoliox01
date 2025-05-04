"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Functional component for a single segment of the progress bar
const ProgressBarSegment = ({ isActive, isPast }: { isActive: boolean; isPast: boolean }) => {
  const variants = {
    initial: { backgroundColor: "var(--segment-inactive)", opacity: 0.3 },
    past: { backgroundColor: "var(--segment-past)", opacity: 0.5 },
    active: { backgroundColor: "var(--segment-active)", opacity: 1 },
  }

  const segmentState = isActive ? "active" : isPast ? "past" : "initial"

  return (
    <motion.div
      className="h-full w-full rounded-sm"
      variants={variants}
      initial="initial"
      animate={segmentState}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  )
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Handle initial mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 8 // Adjusted progress step
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 300) // Shortened delay before exit
          return 100
        }
        return newProgress
      })
    }, 100) // Faster interval

    return () => clearInterval(interval)
  }, [mounted])

  // Define colors for segments
  const segmentColors = `
    --segment-inactive: hsl(var(--muted) / 0.5);
    --segment-past: hsl(var(--primary) / 0.4);
    --segment-active: hsl(var(--primary));
  `

  if (!mounted) return null

  const totalSegments = 80 // Number of segments in the bar
  const activeSegment = Math.floor((progress / 100) * totalSegments)
  
  // Calculate the scale factor based on progress
  // Start at 1.0 and increase to 1.3 as progress approaches 100%
  const scaleAmount = 1 + (progress / 100) * 0.3

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          <style>{`:root { ${segmentColors} }`}</style>

          {/* Progress Bar Container with dynamic scale */}
          <motion.div 
            className="w-4/5 max-w-3xl relative"
            style={{ 
              transformOrigin: "center",
              scale: scaleAmount, // Apply dynamic scale based on progress
            }}
          >
            <div className="flex h-3 gap-1 mb-2">
              {Array.from({ length: totalSegments }).map((_, index) => (
                <div key={index} className="flex-1">
                  <ProgressBarSegment
                    isActive={index === activeSegment}
                    isPast={index < activeSegment}
                  />
                </div>
              ))}
            </div>
            
            {/* Percentage Text */}
            <motion.div
              className="absolute -right-1 top-1/2 -translate-y-1/2 ml-4 text-xs font-mono font-medium text-primary/90"
              key={Math.round(progress)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 