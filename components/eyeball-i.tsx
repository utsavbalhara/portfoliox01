"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useButtonHover } from "@/context/HoverContext"; // Import the hook

const EyeballI: React.FC = () => {
  const eyeContainerRef = useRef<HTMLSpanElement>(null);
  const [innerEyeTransform, setInnerEyeTransform] = useState('translate(-50%, -50%)'); // For iris/pupil movement
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Use the button hover context
  const { isButtonHovered } = useButtonHover();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!eyeContainerRef.current) return;

      // Use the container's bounding box to calculate center
      const eyeRect = eyeContainerRef.current.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;
      
      const cursorX = event.clientX;
      const cursorY = event.clientY;

      const deltaX = cursorX - eyeCenterX;
      const deltaY = cursorY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      // Limit movement distance (relative to container size)
      const maxInnerDist = eyeRect.width * 0.2; // Limit iris/pupil movement within the square
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      // Sensitivity - make it move less than the cursor travels
      const innerDist = Math.min(distance * 0.15, maxInnerDist);

      const innerX = Math.cos(angle) * innerDist;
      const innerY = Math.sin(angle) * innerDist;

      // Apply transform to inner elements
      setInnerEyeTransform(`translate(calc(-50% + ${innerX}px), calc(-50% + ${innerY}px))`);
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

  // Styles for the outer square container (the dot space)
  const eyeContainerStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    bottom: '98%', // Lowered slightly to try and cover the original dot
    transform: 'translateX(-50%)',
    width: '0.35em', 
    height: '0.35em',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  };

  // Define normal and squint heights
  const normalHeight = '70%';
  const squintHeight = '15%';
  const blinkHeight = '10%'; // Even more squinted for blink

  // Styles for the iris (now rectangular white part)
  const irisStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%', // Fill container width
    height: isBlinking ? blinkHeight : isButtonHovered ? squintHeight : normalHeight, // Priority: blink > hover > normal
    backgroundColor: 'white',
    // borderRadius: '50%', // Removed for rectangular shape
    transform: innerEyeTransform, 
    transition: 'transform 0.05s ease-out, height 0.1s ease-in-out', 
    boxShadow: 'inset 0 0 1px rgba(0,0,0,0.4)', // Adjusted shadow slightly
  };

  // Styles for the pupil (black center)
  const pupilStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '40%', // Size relative to iris
    height: '40%',
    backgroundColor: 'black',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)', // Center within the iris
    // No separate transition needed, moves with iris
  };

  return (
    <span 
      ref={eyeContainerRef} 
      style={eyeContainerStyle}
      onClick={handleBlink}
      aria-hidden="true"
    >
      {/* Iris (White part) */}
      <span style={irisStyle}>
        {/* Pupil (Black part) */}
        <span style={pupilStyle} />
      </span>
    </span>
  );
};

export default EyeballI;
