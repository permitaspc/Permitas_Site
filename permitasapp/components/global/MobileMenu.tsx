"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: readonly { readonly label: string; readonly link: string }[];
  theme: "dark" | "light";
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems,
  theme,
}: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 50 },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
  };

  // Theme styles
  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-black" : "bg-white";
  const textColor = isDark ? "text-white" : "text-black";
  const secondaryMap = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className={`fixed inset-0 z-[60] flex flex-col justify-between p-4 sm:p-6 md:p-12 ${bgColor} ${textColor}`}
        >
          {/* Close Button Area (Positioned relative to viewport) */}
          <div className="flex justify-end">
            {/* The Close Icon Logic is handled by the Header button z-index. */}
          </div>

          {/* Navigation Links */}
          <div className="flex-grow flex flex-col justify-center items-start">
            <motion.ul
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="space-y-2 sm:space-y-4"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.link}
                  variants={itemVariants}
                  className="overflow-hidden"
                >
                  <Link
                    href={item.link}
                    onClick={onClose}
                    className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter uppercase block hover:opacity-70 transition-opacity"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Footer / Legal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            className={`flex flex-col gap-2 text-xs sm:text-sm uppercase tracking-widest ${secondaryMap}`}
          >
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
            </div>
            <p>
              &copy; {new Date().getFullYear()} Permitas. All Rights Reserved.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
