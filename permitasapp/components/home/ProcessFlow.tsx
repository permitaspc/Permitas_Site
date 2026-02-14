"use client";

import { motion } from "framer-motion";

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

export default function ProcessFlow({ steps }: ProcessFlowProps) {
  const displaySteps = steps && steps.length > 0 ? steps : defaultSteps;

  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 border-t border-white/10">
      <div className="container mx-auto">
        <div className="mb-20">
          <h2 className="text-sm font-mono text-gray-400 tracking-widest uppercase mb-4">
            (02) Process
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tighter max-w-3xl">
            From concept to approval,
            <br />
            <span className="text-gray-500">we handle every step.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {displaySteps.map((step, i) => {
            const num = `0${i + 1}`;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative"
              >
                {/* Connector Line (Manual for clean look) */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 mb-6" />

                <div className="pt-6">
                  <span className="block font-mono text-xs text-gray-500 mb-2">
                    STEP {num}
                  </span>
                  <h4 className="text-xl font-bold uppercase tracking-tight mb-3">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
