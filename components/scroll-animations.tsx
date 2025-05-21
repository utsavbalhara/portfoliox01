"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollAnimations() {
  useEffect(() => {
    // Select all elements designated for animation
    // Ensure your section components have this class: className="section-animate ..."
    const animatedSections = gsap.utils.toArray('.section-animate')

    if (animatedSections.length === 0) {
      console.warn("ScrollAnimations: No elements found with class '.section-animate'")
      return
    }

    // Create a unique, heavy, smooth animation for each section
    animatedSections.forEach((section) => {
      gsap.fromTo(
        section as Element, // Type assertion for TypeScript
        {
          y: 100,          // Start 100px down
          opacity: 0,      // Start invisible
          scale: 0.95,     // Start slightly scaled down
          filter: 'blur(5px)', // Start blurred
        },
        {
          y: 0,            // End at original position
          opacity: 1,      // End fully visible
          scale: 1,        // End at original scale
          filter: 'blur(0px)', // End sharp
          duration: 1,     // Animation duration (seconds)
          ease: "power3.out", // Smooth, decelerating ease for a "heavy" feel
          scrollTrigger: {
            trigger: section as Element,
            start: "top 85%", // Trigger when the top of the section hits 85% of the viewport height
            end: "bottom 20%", // Adjust end point if needed
            toggleActions: "play none none none", // Play animation once on enter
            // markers: process.env.NODE_ENV === 'development', // Uncomment for debugging
          },
        }
      )
    })

    // Cleanup function to kill ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, []) // Empty dependency array ensures this runs once on mount

  // This component doesn't render anything itself
  return null
}
