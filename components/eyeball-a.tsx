"use client"

import React, { useState, useEffect, useRef } from 'react';

// Renamed component
const EyeballA: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilRef = useRef<SVGCircleElement>(null);
  const ellipseRef = useRef<SVGEllipseElement>(null);
  const [pupilTransform, setPupilTransform] = useState('');
  const [isBlinking, setIsBlinking] = useState(false);
  const [ellipseRy, setEllipseRy] = useState(15);

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
    setEllipseRy(3);
    
    setTimeout(() => {
      setEllipseRy(15);
      setIsBlinking(false);
    }, 150); // Blink duration
  };

  // Define SVG size and alignment to match text
  const svgStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '1.1em', // Adjust width to roughly match 'a'
    height: '1em', // Match line height
    verticalAlign: '-0.15em', // Adjust vertical alignment
    cursor: 'pointer',
    overflow: 'visible', // Allow pupil slight movement outside strict triangle
  };

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
        stroke="currentColor" // Use text color
        strokeWidth="8" // Adjust thickness
      />
      {/* Inner Eye Shape (white fill) - simplified ellipse */}
      <ellipse 
        ref={ellipseRef}
        cx="50" 
        cy="60" // Positioned lower in the triangle
        rx="30" // Horizontal radius
        ry={ellipseRy}
        fill="white"
        style={{
          transition: 'ry 0.075s ease-in-out'
        }}
      />
      {/* Pupil (black circle) */}
      <circle 
        ref={pupilRef}
        cx="50" 
        cy="60" // Initial center same as eye ellipse
        r="8" // Pupil radius
        fill="black"
        style={{
          transform: pupilTransform,
          transition: 'transform 0.05s ease-out'
        }}
      />
    </svg>
  );
};

export default EyeballA; // Export the renamed component 