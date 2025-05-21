'use client';

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import ContactSection from "@/components/contact-section"
import ExperienceSection from "@/components/experience-section"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import ScrollAnimations from "@/components/scroll-animations"
import BackgroundEffect from "@/components/background-effect"
import ScrollToTop from "@/components/scroll-to-top"
import LoadingScreen from "@/components/loading-screen"
import { useState, useEffect } from "react"

export default function Home() {
  const [isProjectsSectionVisible, setIsProjectsSectionVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading screen duration (match your loading-screen exit duration)
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen">
      {/* Dynamic background effect */}
      <BackgroundEffect />
      
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Scroll animations controller */}
      <ScrollAnimations />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content sections */}
      <HeroSection />
      <AboutSection />
      <ExperienceSection disableTimelineHover={isProjectsSectionVisible} />
      <ProjectsSection
        key={isLoading ? "loading" : "loaded"}
        onVisibilityChange={setIsProjectsSectionVisible}
      />
      <SkillsSection />
      <ContactSection />
      
      {/* Scroll to top button */}
      <ScrollToTop />
    </main>
  )
}
