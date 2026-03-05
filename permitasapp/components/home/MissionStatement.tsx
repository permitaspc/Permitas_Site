"use client";

import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useRef } from "react";

interface MissionProps {
  line1?: string;
  line2?: string;
  line3?: string;
  body?: string;
}

// Hardware-accelerated SVG Geometric drawing linking perfectly into scrolling
function BlueprintGrid({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 
        Radial gradient to push the grid into the background 
        and ensure the center text jumps out into the foreground.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#171717_100%)] z-10" />

      {/* 
        Scalable Vector Grid: Traces independent lines without lag.
        preserveAspectRatio slice guarantees the mathematical grid covers both Desktop & Mobile gracefully.
      */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="rgba(255,255,255,0.02)" strokeWidth="1" fill="none">
          <path d="M 0,200 L 1000,200 M 0,400 L 1000,400 M 0,600 L 1000,600 M 0,800 L 1000,800" />
          <path d="M 200,0 L 200,1000 M 400,0 L 400,1000 M 600,0 L 600,1000 M 800,0 L 800,1000" />
          <path d="M 0,0 L 1000,1000 M 1000,0 L 0,1000" />
          <path d="M 500,0 L 1000,500 L 500,1000 L 0,500 Z" />
          <path d="M 200,200 L 800,200 L 800,800 L 200,800 Z" />
        </g>

        {/* Horizontal Lines */}
        <motion.path
          d="M 0,200 L 1000,200 M 0,400 L 1000,400 M 0,600 L 1000,600 M 0,800 L 1000,800"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="2"
          fill="none"
          style={{ pathLength: progress }}
        />
        {/* Vertical Lines */}
        <motion.path
          d="M 200,0 L 200,1000 M 400,0 L 400,1000 M 600,0 L 600,1000 M 800,0 L 800,1000"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="2"
          fill="none"
          style={{ pathLength: progress }}
        />

        {/* Diagonal Structural Traces */}
        <motion.path
          d="M 0,0 L 1000,1000 M 1000,0 L 0,1000"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1.5"
          fill="none"
          style={{ pathLength: progress }}
        />
        {/* Diamond Core */}
        <motion.path
          d="M 500,0 L 1000,500 L 500,1000 L 0,500 Z"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="2"
          fill="none"
          style={{ pathLength: progress }}
        />
        {/* Square Boundary Frame */}
        <motion.path
          d="M 200,200 L 800,200 L 800,800 L 200,800 Z"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="3"
          fill="none"
          style={{ pathLength: progress }}
        />
      </svg>
    </div>
  );
}

export default function MissionStatement({
  line1,
  line2,
  line3,
  body,
}: MissionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Intro Sequence (Scroll 0% -> 15%)
  // Fades out the cinematic title and simultaneously fades in the scattered puzzle pieces
  const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const introScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);
  const scatterOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Rubik's Cube / Chess Piece Assembly Math (Scroll 0% -> 35%)
  // Using 3-point [0, 0.175, 0.35] arrays forces the browser to move X and Y asynchronously.

  // Word 1 (Precision): Rook Move (Horizontal slide to center, then drops Vertically)
  const hero1X = useTransform(scrollYProgress, [0, 0.175, 0.35], [-350, 0, 0]);
  const hero1Y = useTransform(
    scrollYProgress,
    [0, 0.175, 0.35],
    [-200, -200, 0],
  );

  // Word 2 (Trust): Knight Move (Hooks X slowly, snaps Y quickly)
  const hero2X = useTransform(
    scrollYProgress,
    [0, 0.175, 0.35],
    [-450, -200, 0],
  );
  const hero2Y = useTransform(scrollYProgress, [0, 0.175, 0.35], [-50, -50, 0]);

  // Word 3 (Success): Rook Move / Inverse (Vertical pop up, then Horizontal slide)
  const hero3X = useTransform(scrollYProgress, [0, 0.175, 0.35], [150, 150, 0]);
  const hero3Y = useTransform(scrollYProgress, [0, 0.175, 0.35], [250, 0, 0]);

  // Dynamic Scale: Starts massive (but slightly reduced per design feedback) and shrinks to 1 smoothly.
  // We use this as a CSS variable to apply conditionally based on device size via Tailwind.
  const globalHeroScale = useTransform(scrollYProgress, [0, 0.35], [4, 1]);

  useMotionValueEvent(globalHeroScale, "change", (latest) => {
    if (latest === 4 || latest === 1) {
      console.log(
        `[MissionStatement] Hero Global Scale Reached Boundary: ${latest}`,
      );
    }
  });

  // Unified Opacity Reveal (Scroll 35% -> 45%)
  // Sentences and body jump into reality exactly as blocks lock into place.
  const contextOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  // Dynamic Word Splitter Helper:
  // Dynamically separates strings (provided by Keystatic Props or Default Params) into [context, hero]
  // without hardcoding string values, robustly protecting the site.
  const resolveLine = (
    override?: string,
    defaultContext?: string,
    defaultHero?: string,
  ) => {
    if (!override) return { context: defaultContext, hero: defaultHero };
    const words = override.trim().split(" ");
    const hero = words.pop();
    const context = words.length > 0 ? words.join(" ") : "";
    return { context, hero };
  };

  const line1Data = resolveLine(line1, "We design with", "precision.");
  const line2Data = resolveLine(line2, "We build", "trust.");
  const line3Data = resolveLine(line3, "We deliver", "approval.");

  return (
    // Container: 300vh height ensures enough scroll space to "play" the animation
    <motion.section
      ref={containerRef}
      className="relative h-[300vh] bg-neutral-900 text-white"
      style={{ "--hero-scale": globalHeroScale } as React.CSSProperties}
    >
      {/* Sticky Content Window: Stays pinned while scrolling through the container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 text-center bg-[#0a0a0a]">
        {/* Animated Architectural Blueprint Background */}
        <BlueprintGrid progress={scrollYProgress} />

        <div className="max-w-4xl mx-auto relative z-20">
          {/* Cinematic Intro Title */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: introOpacity, scale: introScale }}
          >
            <h3 className="text-5xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-widest text-neutral-800/80">
              OUR MISSION
            </h3>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold uppercase tracking-tighter leading-[1.1] md:leading-[1.1] mb-10 text-white relative z-10">
            <span className="block mb-2 md:mb-0">
              <motion.span
                style={{ opacity: contextOpacity }}
                className="inline-block mr-3 md:mr-4"
              >
                {line1Data.context}
              </motion.span>
              <motion.span
                style={{ x: hero1X, y: hero1Y, opacity: scatterOpacity }}
                className="inline-block"
              >
                <span className="inline-block text-gray-400 transform-none md:[transform:scale(var(--hero-scale))] origin-center will-change-transform">
                  {line1Data.hero}
                </span>
              </motion.span>
            </span>
            <span className="block mb-2 md:mb-0">
              <motion.span
                style={{ opacity: contextOpacity }}
                className="inline-block mr-3 md:mr-4"
              >
                {line2Data.context}
              </motion.span>
              <motion.span
                style={{ x: hero2X, y: hero2Y, opacity: scatterOpacity }}
                className="inline-block"
              >
                <span className="inline-block text-gray-500 transform-none md:[transform:scale(var(--hero-scale))] origin-center will-change-transform">
                  {line2Data.hero}
                </span>
              </motion.span>
            </span>
            <span className="block">
              <motion.span
                style={{ opacity: contextOpacity }}
                className="inline-block mr-3 md:mr-4"
              >
                {line3Data.context}
              </motion.span>
              <motion.span
                style={{ x: hero3X, y: hero3Y, opacity: scatterOpacity }}
                className="inline-block"
              >
                <span className="inline-block text-white transform-none md:[transform:scale(var(--hero-scale))] origin-center will-change-transform">
                  {line3Data.hero}
                </span>
              </motion.span>
            </span>
          </h2>

          <motion.p
            style={{ opacity: contextOpacity }}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed shadow-sm"
          >
            {body ||
              "Art + Strategy + Regulation are the pillars that sustain our relentless pursuit to get your project approved. Regardless of complexity, any vision can be realized when presented the right way."}
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
