"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[50] bg-black pointer-events-none"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Bezier for "Curtain Lift"
      />
      {children}
    </>
  );
}
