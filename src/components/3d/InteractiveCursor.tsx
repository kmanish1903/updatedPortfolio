import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  lineWidth: number;
}

const customColors = ['#00f0ff', '#b900ff', '#ff007f', '#00ff66', '#ffdf00'];

export const InteractiveCursor = () => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Real-time mouse position and target tracking
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const target = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const speed = useRef<number>(0);
  const isHovered = useRef<boolean>(false);
  const clickScale = useRef<number>(1);
  const isDraggingCanvas = useRef<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    // Disable on mobile for touchscreen compatibility
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let lastTime = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initial cursor coordinates setting
    const handleMouseMove = (e: MouseEvent) => {
      if (!active) setActive(true);
      target.current = { x: e.clientX, y: e.clientY };

      // Calculate speed based on coordinate shifts
      const dx = e.clientX - mouse.current.x;
      const dy = e.clientY - mouse.current.y;
      speed.current = Math.sqrt(dx * dx + dy * dy);

      // Skip spawning trail particles if the user is dragging a 3D canvas
      if (isDraggingCanvas.current) return;

      // Spawn trail particles based on cursor speed
      const spawnCount = Math.min(4, Math.floor(speed.current * 0.15));
      for (let i = 0; i < spawnCount; i++) {
        const randColor = customColors[Math.floor(Math.random() * customColors.length)];
        particles.push({
          x: e.clientX,
          y: e.clientY,
          // Spawning trajectory in opposition to velocity vector with random dispersion
          vx: -dx * 0.15 + (Math.random() - 0.5) * 1.5,
          vy: -dy * 0.15 + (Math.random() - 0.5) * 1.5,
          color: randColor,
          size: Math.random() * 4 + 2,
          alpha: 0.8,
          decay: Math.random() * 0.02 + 0.015
        });
      }
    };

    // On Click - Spawn expanding visual shockwaves
    const handleMouseDown = (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement;
      // If clicking a canvas element (OrbitControls, Skill Constellation, etc.), suppress custom cursor
      if (targetElement && targetElement.tagName === 'CANVAS') {
        isDraggingCanvas.current = true;
        return;
      }

      clickScale.current = 0.6;
      
      const clickColor = isHovered.current ? '#ffffff' : '#00f0ff';
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 2,
        maxRadius: 40,
        alpha: 1,
        color: clickColor,
        lineWidth: 2
      });
    };

    const handleMouseUp = () => {
      isDraggingCanvas.current = false;
      clickScale.current = 1;
    };

    // Hover state tracking over interactive assets
    const handleMouseOver = (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement;
      if (!targetElement) return;

      const isInteractive = 
        targetElement.tagName === 'BUTTON' || 
        targetElement.tagName === 'A' || 
        targetElement.closest('a') || 
        targetElement.closest('button') ||
        targetElement.classList.contains('cursor-pointer') ||
        targetElement.closest('.cursor-pointer') ||
        targetElement.closest('.interactive-card');
        
      isHovered.current = !!isInteractive;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Frame-by-frame rendering loop
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth custom cursor spring follow interpolation (LERP)
      const ease = isHovered.current ? 0.2 : 0.15;
      mouse.current.x += (target.current.x - mouse.current.x) * ease;
      mouse.current.y += (target.current.y - mouse.current.y) * ease;

      // 1. Render ripples (expanding wave rings)
      ripples = ripples.filter(ripple => {
        ripple.radius += (ripple.maxRadius - ripple.radius) * 0.12;
        ripple.alpha -= 0.04;
        ripple.lineWidth *= 0.95;

        if (ripple.alpha <= 0) return false;

        ctx.save();
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ripple.color;
        ctx.lineWidth = Math.max(0.5, ripple.lineWidth);
        ctx.globalAlpha = ripple.alpha;
        ctx.shadowBlur = 15;
        ctx.shadowColor = ripple.color;
        ctx.stroke();
        ctx.restore();

        return true;
      });

      // 2. Render particles (cyberpunk glowing trail)
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96; // apply friction
        p.vy *= 0.96;
        p.alpha -= p.decay;

        if (p.alpha <= 0) return false;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();

        return true;
      });

      // 2.5 Draw neural constellation lines between close particles & mouse (extraordinary minimal interaction)
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Connect to current cursor position
        const distToMouse = Math.sqrt(
          Math.pow(p1.x - mouse.current.x, 2) + Math.pow(p1.y - mouse.current.y, 2)
        );
        if (distToMouse < 90) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.strokeStyle = p1.color;
          // Very soft, low-opacity connections for premium minimal look
          ctx.globalAlpha = (1 - distToMouse / 90) * 0.12 * p1.alpha;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        // Connect to neighboring particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distToNeighbor = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          );
          if (distToNeighbor < 60) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - distToNeighbor / 60) * 0.06 * p1.alpha * p2.alpha;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // 3. Render Custom Interactive Cursor Orbs (suppressed while dragging canvas for premium UX)
      if (active && !isDraggingCanvas.current) {
        ctx.save();
        
        // Inner cursor core dot
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, isHovered.current ? 2 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isHovered.current ? '#ffffff' : '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = isHovered.current ? '#ffffff' : '#00f0ff';
        ctx.fill();

        // Outer custom tracking ring
        const ringRadius = isHovered.current ? 24 : 10;
        const ringColor = isHovered.current ? '#ffffff' : '#b900ff';
        
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, ringRadius * clickScale.current, 0, Math.PI * 2);
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = isHovered.current ? 1.5 : 1;
        ctx.globalAlpha = 0.8;
        ctx.shadowBlur = isHovered.current ? 15 : 5;
        ctx.shadowColor = ringColor;
        ctx.stroke();
        
        // Draw auxiliary HUD crosshairs inside the ring on hovers!
        if (isHovered.current) {
          const chLength = 4;
          const offset = ringRadius + 2;
          
          ctx.beginPath();
          // Top tick
          ctx.moveTo(mouse.current.x, mouse.current.y - offset);
          ctx.lineTo(mouse.current.x, mouse.current.y - offset - chLength);
          // Bottom tick
          ctx.moveTo(mouse.current.x, mouse.current.y + offset);
          ctx.lineTo(mouse.current.x, mouse.current.y + offset + chLength);
          // Left tick
          ctx.moveTo(mouse.current.x - offset, mouse.current.y);
          ctx.lineTo(mouse.current.x - offset - chLength, mouse.current.y);
          // Right tick
          ctx.moveTo(mouse.current.x + offset, mouse.current.y);
          ctx.lineTo(mouse.current.x + offset + chLength, mouse.current.y);
          
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none w-full h-full mix-blend-screen"
    />
  );
};

export default InteractiveCursor;
