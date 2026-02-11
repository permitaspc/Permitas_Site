"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface TeamMember {
  slug: string;
  entry: {
    name: string;
    role: string;
    bio?: string;
    photo?: string | null;
  };
}

export default function TeamCard({ member }: { member: TeamMember }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-w-[300px] w-[85vw] md:w-[400px] flex-shrink-0 snap-center md:snap-align-none group">
      {/* 
        1. Media Container
        Changes state based on 'isHovered'.
        Show Photo by default. Show Bio on hover.
      */}
      <div
        className="relative aspect-[3/4] w-full bg-gray-900 overflow-hidden mb-6 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          {!isHovered ? (
            // PHOTO STATE
            <motion.div
              key="photo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              {member.entry.photo ? (
                <Image
                  src={member.entry.photo}
                  alt={member.entry.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-600 font-mono text-xs uppercase tracking-widest">
                  No Photo
                </div>
              )}
              {/* Noise Overlay for "Poor Quality" Masking */}
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
            </motion.div>
          ) : (
            // BIO STATE (Text replaces Image)
            <motion.div
              key="bio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center p-8 bg-black/90 text-white"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed font-serif text-center">
                &quot;{member.entry.bio || "Member of the Permitas team."}&quot;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 
        2. Info / Trigger 
        Hover logic moved to Image container above as requested.
      */}
      <div>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-1 transition-opacity duration-300 group-hover:opacity-60">
          {member.entry.name}
        </h3>
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500">
          {member.entry.role}
        </p>

        {/* Decorative Line that expands when CARD is hovered (keeping this visual cue) */}
        <div className="h-[1px] bg-black mt-4 w-0 group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </div>
  );
}
