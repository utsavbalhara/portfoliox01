"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useButtonHover } from "@/context/HoverContext"; // Import the hook
import { useTheme } from "next-themes"; // Import theme hook

// Renamed component
const EyeballA: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilRef = useRef<SVGCircleElement>(null);
  const ellipseRef = useRef<SVGEllipseElement>(null);
  const [pupilTransform, setPupilTransform] = useState('');
  const [isBlinking, setIsBlinking] = useState(false);
  const { resolvedTheme } = useTheme(); // Get current theme
  const [mounted, setMounted] = useState(false);

  // Mount check to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Consume the hover state from context
  const { isButtonHovered } = useButtonHover();

  // Log the received state
  console.log('EyeballA - isButtonHovered:', isButtonHovered);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!svgRef.current || !pupilRef.current) return;

      const svgRect = svgRef.current.getBoundingClientRect();
      const eyeCenterX = svgRect.left + svgRect.width / 2;
      const eyeCenterY = svgRect.top + svgRect.height / 2;
      
      const cursorX = event.clientX;
      const cursorY = event.clientY;

      const deltaX = cursorX - eyeCenterX;
      const deltaY = cursorY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      // Define boundaries for pupil movement (relative to eye size)
      const eyeRadiusX = svgRect.width * 0.15; // Horizontal radius within triangle
      const eyeRadiusY = svgRect.height * 0.1; // Vertical radius within triangle
      const maxPupilDistX = eyeRadiusX;
      const maxPupilDistY = eyeRadiusY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      // Adjust sensitivity - move less than cursor
      const sensitivity = 0.1;
      let pupilDistX = Math.cos(angle) * distance * sensitivity;
      let pupilDistY = Math.sin(angle) * distance * sensitivity;

      // Clamp movement within the elliptical boundary
      pupilDistX = Math.max(-maxPupilDistX, Math.min(maxPupilDistX, pupilDistX));
      pupilDistY = Math.max(-maxPupilDistY, Math.min(maxPupilDistY, pupilDistY));

      setPupilTransform(`translate(${pupilDistX}px, ${pupilDistY}px)`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleBlink = () => {
    if (isBlinking) return;
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
    }, 150);
  };

  // Define SVG size and alignment to match text
  const svgStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '1.1em', // Adjust width to roughly match 'a'
    height: '1em', // Match line height
    verticalAlign: '-0.15em', // Adjust vertical alignment
    overflow: 'visible', // Allow pupil slight movement outside strict triangle
    cursor: 'pointer', // Show pointer cursor
  };

  // Define ry values for normal and squinted states
  const normalRy = 15;
  const squintRy = 5; // Adjust squint level as needed
  const blinkRy = 2; // Even more squinted for blinking
  
  // Set theme-specific colors
  const isDark = mounted && resolvedTheme === 'dark';
  const strokeColor = 'currentColor'; // Use text color from parent
  const whiteColor = isDark ? 'white' : '#f8f8f8'; // Slightly off-white in light mode
  const blackColor = isDark ? 'black' : '#222222'; // Slightly lighter black in light mode
  const strokeWidth = isDark ? 8 : 6; // Thinner stroke in light mode for better appearance

  if (!mounted) {
    // Return a placeholder with same dimensions to avoid layout shift
    return <svg style={svgStyle} aria-hidden="true"></svg>;
  }

  return (
    <svg 
      ref={svgRef}
      viewBox="0 0 100 100" // ViewBox defines internal coordinate system
      style={svgStyle}
      onClick={handleBlink}
      aria-hidden="true"
    >
      {/* Outer Triangle (stroke only) */}
      <polygon 
        points="50,10 95,90 5,90" // Adjust points for desired triangle shape
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      {/* Inner Eye Shape (white fill) - simplified ellipse */}
      <ellipse 
        ref={ellipseRef}
        cx="50" 
        cy="60" // Positioned lower in the triangle
        rx="30" // Horizontal radius
        ry={isBlinking ? blinkRy : isButtonHovered ? squintRy : normalRy}
        fill={whiteColor}
        style={{
          transition: 'ry 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />
      {/* Pupil (black circle) */}
      <circle 
        ref={pupilRef}
        cx="50" 
        cy="60" // Initial center same as eye ellipse
        r="8" // Pupil radius
        fill={blackColor}
        style={{
          transform: pupilTransform,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />
    </svg>
  );
};

export default EyeballA; // Export the renamed component 