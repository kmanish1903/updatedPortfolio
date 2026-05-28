import React, { useEffect, useRef, useState } from 'react';
import { playHover, playClick } from '@/lib/audio';

interface Tag {
  x: number;
  y: number;
  z: number;
  text: string;
  color: string;
}

const skillsList = [
  { text: 'React.js', color: '#00f0ff' },
  { text: 'Node.js', color: '#39ff14' },
  { text: 'MongoDB', color: '#00ff66' },
  { text: 'Express.js', color: '#ff007f' },
  { text: 'TypeScript', color: '#007acc' },
  { text: 'JavaScript', color: '#ffdf00' },
  { text: 'Python', color: '#306998' },
  { text: 'Docker', color: '#0db7ed' },
  { text: 'Kubernetes', color: '#326ce5' },
  { text: 'AWS', color: '#ff9900' },
  { text: 'DevOps', color: '#b900ff' },
  { text: 'Git', color: '#f05032' },
  { text: 'GitHub', color: '#ffffff' },
  { text: 'REST APIs', color: '#ff3e00' },
  { text: 'FastAPI', color: '#059669' },
  { text: 'Tailwind CSS', color: '#38bdf8' },
  { text: 'Linux', color: '#fcc624' },
  { text: 'MySQL', color: '#00758f' }
];

export const SkillSphere = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  // Rotation angles (radians per frame)
  const rotationX = useRef<number>(0.003);
  const rotationY = useRef<number>(0.003);

  // Interaction tracking
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocity = useRef<{ x: number; y: number }>({ x: 0.003, y: 0.003 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const tags: Tag[] = [];
    const N = skillsList.length;
    const radius = 170; // Sphere radius in pixels

    // Fibonacci sphere algorithm to distribute points evenly in 3D space
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(-1 + (2 * i) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      tags.push({
        x,
        y,
        z,
        text: skillsList[i].text,
        color: skillsList[i].color
      });
    }

    const handleResize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.width; // Keep square
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    const updateAndDraw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Apply decelaration if not dragging
      if (!isDragging.current) {
        rotationX.current += (velocity.current.y - rotationX.current) * 0.05;
        rotationY.current += (velocity.current.x - rotationY.current) * 0.05;
        // Keep ambient rotation going
        velocity.current.x *= 0.98;
        velocity.current.y *= 0.98;
        if (Math.abs(velocity.current.x) < 0.001) velocity.current.x = 0.002;
        if (Math.abs(velocity.current.y) < 0.001) velocity.current.y = 0.002;
      }

      // Pre-calculate trigonometry
      const cosX = Math.cos(rotationX.current);
      const sinX = Math.sin(rotationX.current);
      const cosY = Math.cos(rotationY.current);
      const sinY = Math.sin(rotationY.current);

      // 1. Rotate & project all tags
      const projectedTags = tags.map(tag => {
        // Rotate around Y axis
        const x1 = tag.x * cosY - tag.z * sinY;
        const z1 = tag.x * sinY + tag.z * cosY;
        
        // Rotate around X axis
        const y2 = tag.y * cosX - z1 * sinX;
        const z2 = tag.y * sinX + z1 * cosX;
        
        // Save back rotated values for continuous spin
        tag.x = x1;
        tag.y = y2;
        tag.z = z2;

        // Perspective projection calculation
        // Perspective depth factor
        const d = 300;
        const scale = d / (d + z2);
        
        // Projected 2D screen positions
        const screenX = centerX + x1 * scale;
        const screenY = centerY + y2 * scale;
        
        return {
          screenX,
          screenY,
          scale,
          z: z2,
          text: tag.text,
          color: tag.color
        };
      });

      // 2. Sort tags by Z (depth) so far elements render behind near elements
      projectedTags.sort((a, b) => b.z - a.z);

      // 3. Render tags
      projectedTags.forEach(tag => {
        // Calculate dynamic alpha based on depth
        const alpha = Math.max(0.15, (200 - tag.z) / 370);
        const fontSize = Math.round(13 * tag.scale + 3);
        
        ctx.save();
        ctx.font = `bold ${fontSize}px 'Space Grotesk', system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Setup shadow/glow
        ctx.shadowBlur = 10 * tag.scale;
        ctx.shadowColor = tag.color;
        
        // Set dynamic transparency and fill
        ctx.fillStyle = tag.color;
        ctx.globalAlpha = alpha;
        
        // Check hovered tag
        const isHovered = hoveredTag === tag.text;
        if (isHovered) {
          ctx.font = `bold ${fontSize + 4}px 'Space Grotesk', system-ui, sans-serif`;
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#ffffff';
        }

        // Draw text
        ctx.fillText(tag.text, tag.screenX, tag.screenY);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    // Mouse movement & dragging controls
    const getMouseCoordinates = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      const pos = getMouseCoordinates(e);
      lastMousePos.current = pos;
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const pos = getMouseCoordinates(e);
      
      if (isDragging.current) {
        const dx = pos.x - lastMousePos.current.x;
        const dy = pos.y - lastMousePos.current.y;
        
        // Update velocity based on mouse delta
        velocity.current = {
          x: dx * 0.005,
          y: -dy * 0.005
        };
        
        rotationY.current = velocity.current.x;
        rotationX.current = velocity.current.y;
        
        lastMousePos.current = pos;
      } else {
        // Hover detection when not dragging
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Pre-calculate current scale positions
        let foundHover = null;
        
        // Look through tag projections to find which tag is close to the cursor
        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i];
          const d = 300;
          const scale = d / (d + tag.z);
          const screenX = centerX + tag.x * scale;
          const screenY = centerY + tag.y * scale;
          
          const tagWidth = ctx.measureText(tag.text).width + 20;
          const tagHeight = 24 * scale;
          
          if (
            pos.x >= screenX - tagWidth / 2 &&
            pos.x <= screenX + tagWidth / 2 &&
            pos.y >= screenY - tagHeight / 2 &&
            pos.y <= screenY + tagHeight / 2 &&
            tag.z < 50 // Only hover near tags (foreground)
          ) {
            foundHover = tag.text;
            break;
          }
        }
        
        if (foundHover !== hoveredTag) {
          setHoveredTag(foundHover);
          if (foundHover) {
            playHover();
          }
        }
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Desktop mouse events
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch events for mobile responsiveness
    canvas.addEventListener('touchstart', handleMouseDown);
    canvas.addEventListener('touchmove', handleMouseMove);
    canvas.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchmove', handleMouseMove);
      canvas.removeEventListener('touchend', handleMouseUp);
    };
  }, [hoveredTag]);

  return (
    <div 
      ref={containerRef} 
      className="w-full max-w-[420px] aspect-square flex items-center justify-center relative cursor-grab active:cursor-grabbing mx-auto"
      onClick={() => playClick()}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full rounded-full transition-transform duration-300 hover:scale-[1.02]"
      />
      {/* Dynamic Skill Badge overlay indicator */}
      {hoveredTag && (
        <div className="absolute bottom-2 px-4 py-1.5 rounded-full bg-card/90 border border-primary/40 backdrop-blur-md shadow-glow animate-scale-in text-xs font-bold text-white tracking-widest uppercase">
          {hoveredTag}
        </div>
      )}
    </div>
  );
};
export default SkillSphere;
