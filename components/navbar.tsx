"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import DelhiClock from "@/components/delhi-clock"

// Simple throttle function
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // Memoized and throttled scroll handler
  const handleScroll = useCallback(throttle(() => {
    const currentScrollY = window.scrollY;
    setScrolled(currentScrollY > 10);

    const sections = document.querySelectorAll("section[id]");
    let currentSection = "home";

    sections.forEach((section) => {
      const sectionTop = (section as HTMLElement).offsetTop - 100; // Cast to HTMLElement
      const sectionHeight = (section as HTMLElement).offsetHeight;
      if (
        currentScrollY >= sectionTop &&
        currentScrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id") || "home";
      }
    });

    // Only update state if the section has actually changed
    setActiveSection(prevSection => {
        if (prevSection !== currentSection) {
            return currentSection;
        }
        return prevSection;
    });
  }, 100), []); // Throttle to run at most every 100ms

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true }); // Use passive listener
    // Initial check in case page loads scrolled
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll])

  const navItems = [
    { name: "Journey", href: "#journey" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 w-full z-50 flex items-center justify-between px-6 lg:px-10 py-4 transition-colors duration-300 border-b ${scrolled ? 'bg-background/80 backdrop-blur-md border-border' : 'bg-transparent border-transparent'}`}
    >
      {/* Left side: (Now empty, placeholder for potential Logo/Brand) */}
      <div className="flex items-center">
        {/* <DelhiClock /> */} {/* Moved to the right */} 
        {/* Add logo here if needed */}
        <div className="w-16"> {/* Placeholder to maintain balance if needed */}</div>
      </div>

      {/* Center: Desktop Navigation */}
      <nav 
        className={`hidden md:flex items-center justify-center transition-all duration-300 rounded-full p-1 ${scrolled ? 'bg-secondary/20' : 'bg-transparent'}`}
      >
        {navItems.map((item, index) => (
          <Link
            key={item.name}
            href={item.href}
            className={`nav-link px-6 py-2 font-medium relative transition-all duration-300 ${
              activeSection === item.href.substring(1) 
                ? "text-primary" 
                : "text-foreground/80 hover:text-primary"
            }`}
          >
            {activeSection === item.href.substring(1) && (
              <motion.span 
                layoutId="activeNavIndicator"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              />
            )}
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Right side: Clock, Theme Toggle & Mobile Menu Button */}
      <div className="flex items-center gap-3">
        {/* Clock added here */} 
        <div className="hidden md:block">
          <DelhiClock />
        </div>
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary/30 border border-border transition-colors hover:bg-secondary/50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-x-0 top-0 pt-20 pb-10 bg-background/95 backdrop-blur-lg shadow-lg flex flex-col items-center justify-between z-40"
          >
            {/* Mobile Nav Links */}
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.1 + index * 0.05, 
                    duration: 0.3,
                    ease: [0.2, 0.6, 0.3, 1] // Smoother ease
                  }}
                >
                  <Link
                    href={item.href}
                    className={`text-xl font-medium py-2 px-4 relative transition-colors duration-200 ${activeSection === item.href.substring(1) ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile Theme Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <ThemeToggle />
            </motion.div>

            {/* Close Button (already part of the mobile menu button logic) */}
            {/* Positioned absolutely for consistency */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-secondary/30 border border-border"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
