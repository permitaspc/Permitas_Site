"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const defaultTestimonials = [
  {
    quote:
      "Working with Permitas was a great experience. Their knowledge of planning regulations combined with creative solutions helped us get approval on a difficult site.",
    author: "James H.",
    role: "Homeowner, London",
  },
  {
    quote:
      "Excellent work, communication was always super easy and efficient. They really made our job easy! The drawing pack was professional and validated immediately.",
    author: "Sarah T.",
    role: "Property Developer",
  },
  {
    quote:
      "You leave the consultation knowing exactly what is achievable. No nasty surprises later. A rare level of care and commitment in this industry.",
    author: "Michael R.",
    role: "Architectural Lead",
  },
];

interface TestimonialEntry {
  slug: string;
  entry: {
    client: string;
    quote: string;
    // role is currently missing in schema, so we default
  };
}

interface HomeTestimonialsProps {
  items?: TestimonialEntry[];
  heading?: string | null;
}

export default function HomeTestimonials({
  items,
  heading,
}: HomeTestimonialsProps) {
  const displayItems =
    items && items.length > 0
      ? items.map((t) => ({
          quote: t.entry.quote,
          author: t.entry.client,
          role: "Verified Client", // Schema update pending for Role field
        }))
      : defaultTestimonials;

  // Split items into 3 columns for desktop H-O-H layout
  const col1: typeof displayItems = [];
  const col2: typeof displayItems = [];
  const col3: typeof displayItems = [];

  displayItems.forEach((item, index) => {
    if (index % 3 === 0) col1.push(item);
    else if (index % 3 === 1) col2.push(item);
    else col3.push(item);
  });

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start tracking when the top of the container hits the top of viewport
    // Stop tracking when the bottom of the container hits the bottom of viewport
    offset: ["start start", "end end"],
  });

  // Fade out the heading as the user scrolls through the container
  // 0 -> 0.3 scroll distance = opacity 1 -> 0
  const headingOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    // Make the section tall so there's plenty of scroll space for the parallax effect
    <section
      ref={containerRef}
      className="bg-black text-white relative min-h-[150vh] border-t border-white/10"
    >
      {/* Sticky Background Heading */}
      <div className="sticky top-0 h-screen w-full flex items-start pt-[25vh] justify-center overflow-hidden z-0 pointer-events-none">
        <motion.h2
          style={{ opacity: headingOpacity }}
          className="text-5xl md:text-7xl lg:text-[100px] font-bold uppercase tracking-tighter leading-none max-w-5xl text-center px-6"
        >
          {heading || "TRUSTED BY CLIENTS"}
        </motion.h2>
      </div>

      {/* Foreground Scrolling Grid */}
      {/* We use a negative margin top on mobile if we want cards to overlap earlier, 
          but usually we just let them flow naturally down below the initial viewport. */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 pb-32 -mt-[50vh] md:-mt-[40vh]">
        {/* Desktop: 3 Columns (H-O-H Staggered). Mobile: 1 Column */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Column 1 */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            {col1.map((t, i) => (
              <TestimonialCard key={`c1-${i}`} t={t} />
            ))}
          </div>

          {/* Column 2 (Middle - Pushed Down for Stagger) */}
          <div className="w-full md:w-1/3 flex flex-col gap-6 md:mt-32">
            {col2.map((t, i) => (
              <TestimonialCard key={`c2-${i}`} t={t} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            {col3.map((t, i) => (
              <TestimonialCard key={`c3-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Extracted Card Component for Cleanliness
function TestimonialCard({
  t,
}: {
  t: { quote: string; author: string; role: string };
}) {
  return (
    <div className="flex flex-col justify-between bg-neutral-900 border border-white/10 p-8 md:p-10 hover:border-white/30 transition-colors shadow-2xl">
      <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-12 text-gray-300">
        {t.quote}
      </p>
      <div className="mt-auto pt-6 border-t border-white/10">
        <p className="font-bold uppercase tracking-wider text-white mb-1">
          {t.author}
        </p>
        {t.role && <p className="text-sm text-gray-500">{t.role}</p>}
      </div>
    </div>
  );
}
