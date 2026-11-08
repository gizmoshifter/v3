import React, { useMemo } from 'react';

interface LiquidAuroraBackgroundProps {
  accentColor?: string;
}

export const LiquidAuroraBackground: React.FC<LiquidAuroraBackgroundProps> = ({
  accentColor = '#f43f5e',
}) => {
  // Generate randomized non-repeating starting phase offsets on initial load
  const randomDelays = useMemo(() => {
    return [
      -(Math.random() * 37).toFixed(2) + 's',
      -(Math.random() * 43).toFixed(2) + 's',
      -(Math.random() * 53).toFixed(2) + 's',
      -(Math.random() * 31).toFixed(2) + 's',
      -(Math.random() * 61).toFixed(2) + 's',
      -(Math.random() * 47).toFixed(2) + 's',
    ];
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      style={{ backgroundColor: '#03050a' }}
      aria-hidden="true"
    >
      {/* Dynamic Liquid Aurora Mesh — High Vibrancy Combined Red & Blue with Complementing Hues */}
      <div className="absolute inset-0 filter blur-[80px] sm:blur-[100px] opacity-70 mix-blend-screen transform-gpu">
        {/* Orb 1: Deep Project Crimson / Ruby Red (Top Left drifting across center) */}
        <div
          className="aurora-orb-1 absolute -top-16 -left-16 w-[780px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 45% 45%, rgba(244,63,94,0.9) 0%, rgba(225,29,72,0.65) 40%, rgba(190,18,60,0.2) 70%, transparent 85%)',
            animationDelay: randomDelays[0],
          }}
        />

        {/* Orb 2: Electric Cyber Blue & Deep Royal Blue (Top Right / Center) */}
        <div
          className="aurora-orb-2 absolute top-12 right-[-80px] w-[820px] h-[720px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.95) 0%, rgba(14,165,233,0.7) 35%, rgba(6,182,212,0.3) 65%, transparent 85%)',
            animationDelay: randomDelays[1],
          }}
        />

        {/* Orb 3: Radiant Red-Violet / Orchid Flare (Center / Bottom Left Collision Zone) */}
        <div
          className="aurora-orb-3 absolute top-1/2 left-[-100px] w-[750px] h-[650px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, rgba(225,29,72,0.85) 0%, rgba(168,85,247,0.55) 45%, transparent 75%)',
            animationDelay: randomDelays[2],
          }}
        />

        {/* Orb 4: Deep Ocean Cyan & Electric Blue (Bottom Right Clashing with Red) */}
        <div
          className="aurora-orb-4 absolute -bottom-24 right-1/4 w-[850px] h-[750px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.9) 0%, rgba(37,99,235,0.6) 40%, rgba(30,58,138,0.2) 70%, transparent 85%)',
            animationDelay: randomDelays[3],
          }}
        />

        {/* Orb 5: Complementary Amber Gold / Solar Flare (Center Drifting Core) */}
        <div
          className="aurora-orb-5 absolute top-1/3 left-1/3 w-[620px] h-[550px] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.75) 0%, rgba(239,68,68,0.4) 45%, transparent 75%)',
            animationDelay: randomDelays[4],
          }}
        />

        {/* Orb 6: Deep Royal Indigo / Midnight Cobalt (Floating Center Anchor) */}
        <div
          className="aurora-orb-2 absolute bottom-1/3 left-1/4 w-[700px] h-[600px] rounded-full opacity-70"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(79,70,229,0.8) 0%, rgba(14,165,233,0.45) 50%, transparent 80%)',
            animationDelay: randomDelays[5],
          }}
        />
      </div>

      {/* Liquid Glass Apple Specular Lighting Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.08),transparent_70%)]" />

      {/* Cyber Visor & Subtle Scanline Overlay */}
      <div className="absolute inset-0 project-scanlines opacity-20" />

      {/* Soft Vignette ensuring high content readability while preserving background movement */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#03050a]/75 via-transparent to-[#03050a]/45" />
    </div>
  );
};
