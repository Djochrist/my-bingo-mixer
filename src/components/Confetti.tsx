import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'rect' | 'circle';
  life: number;
  decay: number;
}

const COLORS = [
  '#a78bfa', '#7c3aed', '#22d3ee', '#f59e0b',
  '#ec4899', '#34d399', '#818cf8', '#fb923c',
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function makeParticle(canvasW: number): Particle {
  const angle = randomBetween(-Math.PI * 0.85, -Math.PI * 0.15);
  const speed = randomBetween(6, 18);
  return {
    x: randomBetween(canvasW * 0.2, canvasW * 0.8),
    y: randomBetween(-10, 0),
    vx: Math.cos(angle) * speed * randomBetween(0.4, 1),
    vy: Math.sin(angle) * speed,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: randomBetween(5, 11),
    rotation: randomBetween(0, Math.PI * 2),
    rotationSpeed: randomBetween(-0.18, 0.18),
    shape: Math.random() > 0.4 ? 'rect' : 'circle',
    life: 1,
    decay: randomBetween(0.010, 0.020),
  };
}

interface ConfettiProps {
  active: boolean;
}

export function Confetti({ active }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const burstDoneRef = useRef(false);

  useEffect(() => {
    if (!active) {
      burstDoneRef.current = false;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    if (!burstDoneRef.current) {
      burstDoneRef.current = true;
      const count = 120;
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(makeParticle(canvas.width));
      }
      setTimeout(() => {
        for (let i = 0; i < 80; i++) {
          particlesRef.current.push(makeParticle(canvas.width));
        }
      }, 250);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gravity = 0.35;
      particlesRef.current = particlesRef.current.filter(p => p.life > 0.01);

      for (const p of particlesRef.current) {
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.life -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.min(1, p.life * 2);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (particlesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none"
    />
  );
}
