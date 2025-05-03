"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
}

export default function TypewriterText({ text, delay = 0, speed = 50 }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let currentIndex = 0

    const startTyping = () => {
      setIsTyping(true)

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1))
          currentIndex++
          timeout = setTimeout(typeNextChar, speed)
        } else {
          setIsTyping(false)
        }
      }

      typeNextChar()
    }

    const delayTimeout = setTimeout(() => {
      startTyping()
    }, delay)

    return () => {
      clearTimeout(delayTimeout)
      clearTimeout(timeout)
    }
  }, [text, delay, speed])

  return (
    <div className="inline-block">
      <span>{displayText}</span>
      {isTyping && <span className="inline-block w-1 h-5 ml-1 bg-silver-light animate-cursor-blink"></span>}
    </div>
  )
}
