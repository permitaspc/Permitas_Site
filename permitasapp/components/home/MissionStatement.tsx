"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface MissionProps {
  line1?: string;
  line2?: string;
  line3?: string;
  body?: string;
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
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-10">
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
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            {body ||
              "Art + Strategy + Regulation are the pillars that sustain our relentless pursuit to get your project approved. Regardless of complexity, any vision can be realized when presented the right way."}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
