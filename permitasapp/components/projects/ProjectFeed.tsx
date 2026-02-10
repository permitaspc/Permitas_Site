// components/projects/ProjectFeed.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface ProjectCardData {
  slug: string;
  entry: {
    title: string;
    coverImage: string | null;
    location: string;
    category: string;
    year: string;
  };
}

interface ProjectFeedProps {
  projects: ProjectCardData[];
}

// 1. ISOLATED CARD COMPONENT
// We need this because 'useScroll' tracks the reference of a specific element.
// If we loop inside the main component, we can't easily track individual scroll progress.
const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectCardData;
  index: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Logic: Track scroll of THIS card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll to Y movement (The "Internal Window" effect)
  // The image moves -15% to +15% inside its container while the user scrolls
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={containerRef} className="w-full mb-1 last:mb-0">
      <Link
        href={`/projects/${project.slug}`}
        className="group block w-full relative"
      >
        {/* IMAGE CONTAINER: Full Width, No Blank Spaces */}
        <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden bg-gray-200">
          {/* PARALLAX IMAGE WRAPPER */}
          {/* We make the image 130% height so it has room to move up/down without showing gaps */}
          <motion.div
            style={{ y }}
            className="relative w-full h-[130%] -top-[15%]"
          >
            <Image
              src={project.entry.coverImage || "/images/placeholder.jpg"}
              alt={project.entry.title}
              fill
              className="object-cover" // NO SCALE on hover, just Parallax
              sizes="100vw"
              priority={index < 2} // Prioritize first 2 images for LCP
            />
          </motion.div>

          {/* OVERLAY: Subtle gradient for text protection */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />

          {/* TYPOGRAPHY: The "Masked Reveal" */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
            <div className="container mx-auto">
              {/* Title Reveal */}
              <div className="overflow-hidden mb-2">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }} // "Expo" ease
                  className="text-5xl md:text-8xl font-bold tracking-tighter"
                >
                  {project.entry.title}
                </motion.h2>
              </div>

              {/* Meta Data Reveal */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2,
                  }}
                  className="flex items-center gap-6 text-sm md:text-xl font-mono"
                >
                  <span>{project.entry.location}</span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span className="uppercase">{project.entry.category}</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

// 2. MAIN FEED
export default function ProjectFeed({ projects }: ProjectFeedProps) {
  return (
    <div className="flex flex-col w-full">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
