"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link"; // Unused
// import { ArrowUpRight } from "lucide-react"; // Unused

// Default Data adapted from Permitas site
const defaultServices = [
  {
    title: "Planning Applications",
    description:
      "Planning drawings, building regulations advice and complete council submissions for extensions, loft conversions and change of use.",
    linkUrl: "/services/planning",
  },
  {
    title: "Building Control Drawings",
    description:
      "Detailed technical drawings ensuring structure, fire safety, and insulation meet all UK building regulations approval standards.",
    linkUrl: "/services/building-control",
  },
  {
    title: "Permitted Development",
    description:
      "Expert assessment of your property rights to fast-track extensions and conversions without full planning permission requirements.",
    linkUrl: "/services/permitted-development",
  },
  {
    title: "Change of Use",
    description:
      "Strategic advice and statements for commercial-to-residential conversions and other usage class changes.",
    linkUrl: "/services/change-of-use",
  },
];

interface ServiceItem {
  title: string;
  description: string;
  linkUrl?: string; // Keystatic field is linkUrl
}

interface ServicesPillarsProps {
  services?: readonly ServiceItem[];
}

export default function ServicesPillars({ services }: ServicesPillarsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayServices =
    services && services.length > 0 ? services : defaultServices;

  return (
    <section className="bg-neutral-950 text-white py-24 px-6 md:px-12 border-t border-white/10">
      <div className="container mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-gray-400 tracking-widest uppercase mb-4">
            (01) Services
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">
            We handle the paperwork.
            <br />
            You focus on the build.
          </h3>
        </div>

        <div className="flex flex-col">
          {displayServices.map((service, index) => {
            const id = `0${index + 1}`; // Generate ID 01, 02...

            return (
              <motion.div
                key={index}
                className="group border-t border-white/20 py-10 cursor-pointer relative overflow-hidden"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={false}
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 z-10 relative">
                  {/* Number & Title */}
                  <div className="flex items-baseline gap-6 md:w-1/2">
                    <span className="font-mono text-sm text-gray-500 group-hover:text-white transition-colors duration-300">
                      {id}
                    </span>
                    <h4 className="text-2xl md:text-4xl font-bold uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-300">
                      {service.title}
                    </h4>
                  </div>

                  {/* Description - Visible on hover/mobile */}
                  <div className="md:w-1/2 overflow-hidden">
                    {/* Always show on mobile, animate on desktop */}
                    <div className="hidden md:block">
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="text-gray-400 max-w-lg mb-4">
                              {service.description}
                            </p>
                            <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest underline decoration-1 underline-offset-4">
                              Learn More <span className="text-lg">↗</span>
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Mobile View */}
                    <div className="md:hidden">
                      <p className="text-gray-400 max-w-lg mb-4 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
          <div className="border-t border-white/20" />
        </div>
      </div>
    </section>
  );
}
