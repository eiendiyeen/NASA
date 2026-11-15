import React from 'react';

export const StarfieldBackdrop: React.FC = () => {
  return (
    <img
      src="/assets/images/orbit.jpeg"
      alt=""
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover object-center scale-[1.04] invert contrast-150 brightness-95 mix-blend-screen opacity-35 select-none"
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
