"use client"

import { useEffect, useRef } from "react"

export default function ScrollAnimations() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Initialize intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    // Observe all elements with animate-on-scroll class
    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return null
}
