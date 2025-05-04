"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Mount check to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !mounted) return

    // Determine if we're in dark mode
    const isDarkMode = resolvedTheme === "dark"
    
    // Set colors based on theme
    const gridColor = isDarkMode ? 0xffffff : 0x000000
    const gridOpacity = isDarkMode ? 0.12 : 0.08
    const particleColor = isDarkMode ? 0xffffff : 0x000000
    const particleOpacity = isDarkMode ? 0.4 : 0.3

    // Create scene, camera, and renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Set camera position
    camera.position.z = 20
    
    // Create a cleaner grid with waves
    const gridSize = 40
    const gridDivisions = 30
    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: gridColor,
      transparent: true,
      opacity: gridOpacity,
    })
    
    // Create 3D Grid with waves
    const gridGroup = new THREE.Group()
    
    // Function to create wave effect
    const createWavePoint = (x: number, z: number, time: number = 0) => {
      const distance = Math.sqrt(x*x + z*z) / 5;
      const y = Math.sin(distance + time) * 1.5;
      return new THREE.Vector3(x, y, z);
    }
    
    // Create grid lines with wave effect
    for (let i = 0; i <= gridDivisions; i++) {
      const linePoints = [];
      for (let j = 0; j <= 100; j++) { // Increase resolution for smoother curves
        const x = -gridSize/2 + j * (gridSize/100);
        const z = -gridSize/2 + i * (gridSize/gridDivisions);
        linePoints.push(createWavePoint(x, z));
      }
      
      const line = new THREE.BufferGeometry().setFromPoints(linePoints);
      const gridLine = new THREE.Line(line, gridMaterial);
      gridGroup.add(gridLine);
    }
    
    for (let i = 0; i <= gridDivisions; i++) {
      const linePoints = [];
      for (let j = 0; j <= 100; j++) { // Increase resolution for smoother curves
        const x = -gridSize/2 + i * (gridSize/gridDivisions);
        const z = -gridSize/2 + j * (gridSize/100);
        linePoints.push(createWavePoint(x, z));
      }
      
      const line = new THREE.BufferGeometry().setFromPoints(linePoints);
      const gridLine = new THREE.Line(line, gridMaterial);
      gridGroup.add(gridLine);
    }
    
    scene.add(gridGroup);
    
    // Create particle system
    const particlesCount = 500;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleSizes = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      // Random position within a larger volume than the grid
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * gridSize * 1.5;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * gridSize * 0.5;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * gridSize * 1.5;
      
      // Random sizes
      particleSizes[i] = Math.random() * 2;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.1,
      transparent: true,
      opacity: particleOpacity,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Initial rotation
    gridGroup.rotation.x = Math.PI / 6;
    
    // Mouse interaction for rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      // Update wave effect
      gridGroup.children.forEach((child) => {
        if (child instanceof THREE.Line) {
          const line = child;
          const geometry = line.geometry;
          const positions = geometry.attributes.position.array;
          
          for (let i = 0; i < positions.length / 3; i++) {
            const i3 = i * 3;
            const x = positions[i3];
            const z = positions[i3 + 2];
            
            // Apply wave effect
            positions[i3 + 1] = createWavePoint(x, z, time).y;
          }
          
          geometry.attributes.position.needsUpdate = true;
        }
      });
      
      // Rotate particles slightly with consistent speed
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0003;
      
      // Rotate grid based on mouse with consistent easing
      targetX = mouseX * 0.3;
      targetY = mouseY * 0.2;
      
      gridGroup.rotation.y += (targetX - gridGroup.rotation.y) * 0.05;
      gridGroup.rotation.x += (targetY - gridGroup.rotation.x) * 0.05;
      
      // Subtle continuous rotation
      gridGroup.rotation.y += 0.0003;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      scene.remove(gridGroup);
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      gridMaterial.dispose();
      renderer.dispose();
    };
  }, [mounted, resolvedTheme, theme]);

  if (!mounted) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-75"
    />
  );
}
