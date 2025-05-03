"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
}

export default function RevealText({ text, className = "", delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setRevealed(true)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  return (
    <div ref={ref} className={`reveal-text ${revealed ? "revealed" : ""} ${className}`}>
      {text.split("").map((char, index) => (
        <span key={index} style={{ transitionDelay: `${0.05 * index + delay / 1000}s` }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  )
}
