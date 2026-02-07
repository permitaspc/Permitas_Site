// components/projects/ParallaxImage.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
}

export default function ParallaxImage({ src, alt }: ParallaxImageProps) {
  const containerRef = useRef(null);

  // Track scroll progress of this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Start animating when top enters, end when bottom leaves
  });

  // Map scroll progress (0 to 1) to a Y-axis translation (-10% to 10%)
  // This creates the "drag" or parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 mb-12 last:mb-0"
    >
      <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </motion.div>
    </div>
  );
}
