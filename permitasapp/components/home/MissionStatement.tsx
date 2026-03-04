"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
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

  // Opacity transforms for sequential reveal (Scrubbing Effect)
  // The scroll distance (0 to 1) is split into chunks for each line
  const opacity1 = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]); // Precision
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]); // Trust
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]); // Approval
  const opacity4 = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]); // Paragraph

  return (
    // Container: 300vh height ensures enough scroll space to "play" the animation
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-neutral-900 text-white"
    >
      {/* Sticky Content Window: Stays pinned while scrolling through the container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 text-center bg-[#0a0a0a]">
        {/* Animated Architectural Blueprint Background */}
        <BlueprintGrid progress={scrollYProgress} />

        <div className="max-w-4xl mx-auto relative z-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-10 text-white">
            <motion.span style={{ opacity: opacity1 }} className="block">
              {line1 || (
                <>
                  We design with{" "}
                  <span className="text-gray-500">precision.</span>
                </>
              )}
            </motion.span>
            <motion.span style={{ opacity: opacity2 }} className="block">
              {line2 || (
                <>
                  We build <span className="text-gray-500">trust.</span>
                </>
              )}
            </motion.span>
            <motion.span style={{ opacity: opacity3 }} className="block">
              {line3 || (
                <>
                  We deliver <span className="text-white">approval.</span>
                </>
              )}
            </motion.span>
          </h2>

          <motion.p
            style={{ opacity: opacity4 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed shadow-sm"
          >
            {body ||
              "Art + Strategy + Regulation are the pillars that sustain our relentless pursuit to get your project approved. Regardless of complexity, any vision can be realized when presented the right way."}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
