"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session storage to run only once per session
    const hasSeenLoader = sessionStorage.getItem("permitas-loader-seen");

    if (hasSeenLoader) {
      setIsLoading(false);
      return;
    }

    // Set flag so it doesn't run again this session
    sessionStorage.setItem("permitas-loader-seen", "true");

    // Total duration: ~2.5s to 3s
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }, // Bezier for "Curtain Lift"
          }}
        >
          {/* Main Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* 
              New Implementation: 
              Subtle, Premium, Translucent Typography 
              Inspired by mino.works
            */}
            <motion.h1
              className="text-white font-bold tracking-tighter uppercase select-none relative z-10 mix-blend-difference"
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: "clamp(3rem, 15vw, 12rem)", // Responsive giant text
                opacity: 0.9, // Slight translucency
              }}
              initial={{
                scale: 0.9,
                opacity: 0,
                filter: "blur(10px)",
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1], // Custom easeOut
              }}
            >
              PERMITAS
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
