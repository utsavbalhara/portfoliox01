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

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
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
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to top button */}
      <ScrollToTop />
    </main>
  )
}
