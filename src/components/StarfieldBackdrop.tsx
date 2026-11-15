import React, { useEffect, useRef } from 'react';

export const StarfieldBackdrop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId = 0;

    interface Star {
      x: number;
      y: number;
      r: number;
      alpha: number;
      speed: number;
      hue: string;
    }

    let stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(220, Math.floor((canvas.width * canvas.height) / 6800));
      stars = Array.from({ length: count }, () => {
        const tintRoll = Math.random();
        // Strictly White (#FFFFFF) and Blue Yonder (#2E96F5)
        const hue = tintRoll > 0.72 ? '46, 150, 245' : '255, 255, 255';
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.35 + 0.3,
          alpha: Math.random() * 0.75 + 0.2,
          speed: Math.random() * 0.015 + 0.004,
          hue,
        };
      });
    };

    resize();
    window.addEventListener('resize', resize);

    let tick = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick += 1;

      for (const s of stars) {
        const twinkle = prefersReducedMotion
          ? s.alpha
          : s.alpha * (0.68 + 0.32 * Math.sin(tick * s.speed + s.x));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue}, ${twinkle.toFixed(3)})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationId = window.requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-85"
    />
  );
};

export const AerospaceHudFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative z-10 min-h-screen w-full p-2 sm:p-3.5 lg:p-5 flex flex-col">
      <div className="relative flex-1 flex flex-col rounded-2xl border border-[#2E96F5]/35 bg-transparent shadow-[0_0_60px_rgba(7,23,63,0.55),inset_0_0_40px_rgba(46,150,245,0.1)] overflow-hidden">
        {/* Top Glowing Accent Hairline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-16 h-px bg-gradient-to-r from-transparent via-[#2E96F5]/80 to-transparent"
        />

        {/* Subtle Bottom Chamfered HUD Line Overlay */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 44"
          preserveAspectRatio="none"
          className="pointer-events-none absolute bottom-0 inset-x-0 w-full h-7 z-30"
        >
          <path
            d="M 0 8 L 28 36 L 380 36 L 405 41 L 1035 41 L 1060 36 L 1412 36 L 1440 8"
            fill="none"
            stroke="#0960E1"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
          <line
            x1="560"
            y1="41"
            x2="880"
            y2="41"
            stroke="#2E96F5"
            strokeOpacity="0.85"
            strokeWidth="2"
          />
        </svg>

        {children}
      </div>
    </div>
  );
};
