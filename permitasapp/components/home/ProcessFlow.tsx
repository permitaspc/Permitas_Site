"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

const defaultSteps = [
  {
    title: "Consultation",
    description:
      "Share address and idea. Get expert feedback on viability, timeline, and cost.",
  },
  {
    title: "Survey & Brief",
    description:
      "We capture a detailed brief and site measurements to start on solid ground.",
  },
  {
    title: "Strategy",
    description:
      "We design layouts and elevations that balance your wants with council rules.",
  },
  {
    title: "Application",
    description:
      "We prepare a complete professional drawing pack checked against regulations.",
  },
  {
    title: "Submission",
    description:
      "We submit and act as your agent, handling all council queries and tweaks.",
  },
  {
    title: "Decision",
    description:
      "We explain the outcome and guide you to the next stage of building.",
  },
];

interface StepItem {
  title: string;
  description: string;
}

interface ProcessFlowProps {
  steps?: readonly StepItem[];
}

function ElevatorNumber({
  index,
  scrollYProgress,
  total,
}: {
  index: number;
  scrollYProgress: any;
  total: number;
}) {
  const centerP = total > 1 ? index / (total - 1) : 0;
  // Increase distribution distance so it overlaps slightly for smooth color fade
  const dist = total > 1 ? 1 / (total - 1) : 1;

  const color = useTransform(
    scrollYProgress,
    [
      -1,
      centerP - dist * 0.5,
      centerP - dist * 0.1,
      centerP,
      centerP + dist * 0.1,
      centerP + dist * 0.5,
      2,
    ],
    [
      "rgba(107, 114, 128, 0)", // transparent gray (off-screen)
      "rgba(107, 114, 128, 1)", // gray outside box
      "rgba(0, 0, 0, 1)", // black perfectly entering box
      "rgba(0, 0, 0, 1)", // black perfectly active
      "rgba(0, 0, 0, 1)", // black leaving box
      "rgba(107, 114, 128, 1)", // gray outside box
      "rgba(107, 114, 128, 0)", // transparent gray (off-screen)
    ],
  );

  const opacity = useTransform(
    scrollYProgress,
    [-1, centerP - dist * 0.8, centerP, centerP + dist * 0.8, 2],
    [0, 1, 1, 1, 0],
  );

  return (
    <motion.div
      style={{
        color,
        opacity,
      }}
      className="flex items-center justify-center text-[10rem] md:text-[12rem] lg:text-[14rem] font-black font-sans leading-none tracking-tighter w-full h-56 lg:h-64"
    >
      {index + 1}
    </motion.div>
  );
}

export default function ProcessFlow({ steps }: ProcessFlowProps) {
  const displaySteps = steps && steps.length > 0 ? steps : defaultSteps;

  useEffect(() => {
    console.log(
      "DEBUG [ProcessFlow]: Mounted with total steps:",
      displaySteps.length,
    );
  }, [displaySteps]);

  // Target the specific wrapper holding the exact height items
  const stepsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    // When top of container hits top of viewport --> 0%
    // When bottom of container hits bottom of viewport --> 100%
    // Since each target element is exactly `100vh`, this perfectly syncs their centers with the sticky column!
    offset: ["start start", "end end"],
  });

  const total = displaySteps.length;
  // Moves up by exactly 1 "step unit" (height of a number wrapper) per increment.
  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((total - 1) / total) * 100}%`],
  );

  return (
    <section className="bg-black text-white relative border-t border-white/10">
      {/* Title Header acts as an independent flow block ABOVE the sticky sections */}
      <div className="container mx-auto px-6 md:px-12 pt-24 pb-12">
        <h2 className="text-sm font-mono text-gray-400 tracking-widest uppercase mb-4">
          (02) Process
        </h2>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-4xl">
          From concept to approval,
          <br />
          <span className="text-gray-500">we handle every step.</span>
        </h3>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative flex flex-col md:flex-row pb-24">
        {/* DESKTOP LEFT COLUMN: Frame + Sticky Elevator */}
        <div className="hidden md:block w-1/3 lg:w-2/5 sticky top-0 h-screen overflow-hidden">
          {/* Stationary White Box Background perfectly centered horizontally and vertically */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 lg:w-64 lg:h-64 bg-white rounded-[2rem] shadow-xl pointer-events-none z-0" />

          {/* Wrapper for moving numbers */}
          {/* Centering math: The motion wrapper top starts exactly halfway down the screen.
              The numbers are 56/64 tall. So to center the FIRST number perfectly on the screen at 0%,
              we subtract exactly HALF of its height (`-mt-28` or `-mt-32`) 
          */}
          <motion.div
            style={{ y: yTransform }}
            className="absolute top-1/2 left-0 w-full flex flex-col items-center -mt-28 lg:-mt-32 z-10 pointer-events-none"
          >
            {displaySteps.map((_, i) => (
              <ElevatorNumber
                key={i}
                index={i}
                scrollYProgress={scrollYProgress}
                total={total}
              />
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN (DESKTOP) + MOBILE STACK */}
        <div
          ref={stepsRef}
          className="w-full md:w-2/3 lg:w-3/5 flex flex-col relative z-20"
        >
          {displaySteps.map((step, i) => (
            <div
              key={i}
              className="min-h-[70vh] md:h-screen flex flex-col justify-center max-w-xl mx-auto md:mx-0 w-full group py-12 md:py-0"
            >
              {/* Mobile View: Vertical Stacking Block */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="md:hidden bg-neutral-900 border border-white/5 rounded-3xl p-8 relative overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 text-[10rem] font-black text-white/[0.03] pointer-events-none select-none">
                  {i + 1}
                </div>
                <span className="text-gray-500 font-mono text-xs mb-4 block">
                  STEP 0{i + 1}
                </span>
                <h4 className="text-3xl font-bold uppercase mb-4 tracking-tight">
                  {step.title}
                </h4>
                <p className="text-gray-400 text-base leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Desktop View: Adjusted Typography Scale & Padding */}
              <div className="hidden md:block py-10 relative">
                <span className="text-gray-500 font-mono text-base lg:text-lg mb-6 block tracking-widest transition-colors duration-500 group-hover:text-white">
                  STEP 0{i + 1}
                </span>
                <h4 className="text-5xl lg:text-7xl font-bold uppercase mb-8 tracking-tight text-white transition-transform duration-500 origin-left group-hover:scale-[1.02]">
                  {step.title}
                </h4>
                <p className="text-gray-400 text-xl lg:text-2xl leading-relaxed max-w-lg lg:max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
