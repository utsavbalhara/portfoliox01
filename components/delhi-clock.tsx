"use client"

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
// We will use native Intl.DateTimeFormat which is generally sufficient and avoids timezone libraries

const DelhiClock = () => {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timerId = setInterval(() => {
      try {
        const now = new Date();
        // Use Intl.DateTimeFormat for robust timezone handling
        const formattedTime = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit', // Add seconds
          hour12: true, // Use AM/PM
        }).format(now);
        setTime(formattedTime);
      } catch (error) {
        console.error("Error formatting time:", error);
        // Handle potential errors (e.g., invalid timezone)
        setTime("Error");
        clearInterval(timerId); // Stop interval on error
      }
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);
  }, []); // Empty dependency array ensures this runs only once on mount

  if (!mounted) {
    // Avoid hydration mismatch by rendering placeholder or null initially
    return <div className="text-xs font-mono w-[7ch] h-[1.5em]"></div>; // Placeholder with similar size
  }

  return (
    // Remove city name text, keep time and tooltip
    <div className="text-xs font-mono text-muted-foreground" title="Current time in New Delhi">
      {/* <span>New Delhi</span> */}
      <span className="font-medium">{time}</span>
    </div>
  );
};

export default DelhiClock; 