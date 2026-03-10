"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

interface CustomProjectCursorProps {
  isActive: boolean;
}

export default function CustomProjectCursor({ isActive }: CustomProjectCursorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor follow effect
  const springX = useSpring(mouseX, { stiffness: 300, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 25, mass: 0.5 });

  useEffect(() => {
    setIsMounted(true);
    
    // Always track mouse position while component is mounted to prevent jumping from 0,0
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.2 } }}
          style={{
            x: springX,
            y: springY,
          }}
          className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center gap-3 drop-shadow-md"
        >
          {/* Offset wrapper to position it beside the actual pointer */}
          <div className="flex items-center gap-3 translate-x-5 -translate-y-2">
            {/* Blinking Square */}
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-4 h-4 bg-white"
            />
            {/* Text */}
            <span
              className="text-white font-bold text-sm tracking-widest whitespace-nowrap"
              style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.5)" }}
            >
              (VIEW PROJECT)
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
