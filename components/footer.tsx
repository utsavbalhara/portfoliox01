"use client"

import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-bold gradient-text font-syne">
                dev<span className="text-dark-accent">*</span>
              </div>
              <p className="text-dark-text/70 mt-2 font-outfit">
                Crafting digital experiences with passion and precision.
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-dark-text/70 font-outfit">&copy; {currentYear} Your Name. All rights reserved.</p>
              <p className="text-dark-text/50 text-sm mt-1 font-outfit">Designed and built with ❤️</p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
