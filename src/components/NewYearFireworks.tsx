import React, { useEffect, useRef, useState } from "react";

// Visible until January 2, 2026 at 23:59
const END_DATE = new Date("2026-01-02T23:59:59");

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
  decay: number;
}

interface Firework {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  color: string;
  exploded: boolean;
}

const COLORS = [
  "#FFD700", // Gold
  "#FF6B6B", // Coral red
  "#4ECDC4", // Teal
  "#A78BFA", // Purple
  "#F472B6", // Pink
  "#60A5FA", // Blue
  "#34D399", // Green
  "#FBBF24", // Amber
];

export const NewYearFireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Check if we should show the animation
    const now = new Date();
    if (now > END_DATE) {
      setIsActive(false);
      return;
    }
    setIsActive(true);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let fireworks: Firework[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const targetY = canvas.height * 0.1 + Math.random() * canvas.height * 0.3;
      
      fireworks.push({
        x,
        y: canvas.height,
        targetY,
        speed: 3 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        exploded: false,
      });
    };

    const explodeFirework = (firework: Firework) => {
      const particleCount = 40 + Math.floor(Math.random() * 30);
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = 1 + Math.random() * 3;
        
        particles.push({
          x: firework.x,
          y: firework.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: firework.color,
          alpha: 0.6 + Math.random() * 0.4,
          size: 1.5 + Math.random() * 1.5,
          decay: 0.008 + Math.random() * 0.008,
        });
      }
    };

    const animate = () => {
      // Semi-transparent clear for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw fireworks
      fireworks = fireworks.filter((fw) => {
        if (!fw.exploded) {
          fw.y -= fw.speed;
          
          // Draw rising firework
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = fw.color;
          ctx.globalAlpha = 0.8;
          ctx.fill();
          ctx.globalAlpha = 1;
          
          if (fw.y <= fw.targetY) {
            fw.exploded = true;
            explodeFirework(fw);
            return false;
          }
          return true;
        }
        return false;
      });

      // Update and draw particles
      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // Gravity
        p.alpha -= p.decay;
        
        if (p.alpha <= 0) return false;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.5; // Extra transparency
        ctx.fill();
        ctx.globalAlpha = 1;
        
        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    // Launch fireworks at random intervals
    const launchInterval = setInterval(() => {
      const now = new Date();
      if (now > END_DATE) {
        setIsActive(false);
        return;
      }
      
      // Random chance to launch (subtle effect)
      if (Math.random() < 0.6) {
        createFirework();
      }
    }, 1500);

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(launchInterval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, opacity: 0.35 }}
      aria-hidden="true"
    />
  );
};
