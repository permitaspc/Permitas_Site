"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import TeamCard from "./TeamCard";

interface TeamMember {
  slug: string;
  entry: {
    name: string;
    role: string;
    bio?: string;
    photo?: string | null;
  };
}

export default function TeamFeed({ team }: { team: TeamMember[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Optional: Add horizontal scroll progress indicator if needed later
  const { scrollXProgress } = useScroll({ container: containerRef });

  console.log(`[Debug] TeamFeed rendered with ${team.length} members`);

  return (
    <div className="w-full relative py-12">
      {/* 
         Horizontal Scroll Container 
         - Hide Scrollbar style is usually handled in global CSS or utility class 
           For Tailwind: 'scrollbar-hide' if plugin exists, or use raw css.
         - 'snap-x' for better mobile experience
       */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto flex gap-6 md:gap-12 px-6 md:px-12 pb-12 snap-x snap-mandatory scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {team.map((member, index) => (
          <motion.div
            key={member.slug}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1], // Expo ease
              delay: index * 0.1,
            }}
          >
            <TeamCard member={member} />
          </motion.div>
        ))}
        {/* Spacer for right padding */}
        <div className="w-12 flex-shrink-0" />
      </div>

      {/* Progress Line (Optional "Futuristic" touch) */}
      <div className="w-full h-[1px] bg-gray-200 mt-8 relative overflow-hidden">
        <motion.div
          style={{ scaleX: scrollXProgress, transformOrigin: "0%" }}
          className="absolute top-0 left-0 bottom-0 h-full w-full bg-black"
        />
      </div>
    </div>
  );
}
