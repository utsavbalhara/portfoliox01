"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function PixelArt() {
  const [hover, setHover] = useState(false)

  return (
    <motion.div className="float-element" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="w-16 h-16 relative">
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {/* Simple pixel art character - 8x8 grid */}
          {[
            0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 1, 2, 3, 2, 2, 3, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2,
            2, 2, 2, 1, 1, 2, 3, 2, 2, 3, 2, 1, 0, 1, 2, 3, 3, 2, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0,
          ].map((color, index) => {
            let bgColor = "transparent"
            if (color === 1) bgColor = "rgba(255,255,255,0.8)"
            if (color === 2) bgColor = hover ? "rgba(197, 209, 200, 0.9)" : "rgba(197, 209, 200, 0.7)" // Charleston Mint
            if (color === 3) bgColor = "rgba(0,0,0,0.8)"

            return <div key={index} className="w-full h-full" style={{ backgroundColor: bgColor }} />
          })}
        </div>
      </div>
    </motion.div>
  )
}
