"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";

interface HeaderProps {
  siteTitle?: string;
  logo?: string | null;
  navItems?: readonly { readonly label: string; readonly link: string }[];
}

export default function Header({ siteTitle, logo, navItems }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Determine theme based on path
  // Home ("/") gets "dark" theme (White text on transparent/black), others get "light" (Black text on white)
  // HOWEVER: The existing desktop header uses `mix-blend-difference` which handles contrast automatically.
  // We need explicit theme for the MOBILE MENU background.
  const isHome = pathname === "/";
  const mobileTheme = isHome ? "dark" : "light";

  const title = siteTitle || "Permitas";
  const menu = navItems?.length
    ? navItems
    : [
        { label: "Work", link: "/projects" },
        { label: "Studio", link: "/about" },
        { label: "Contact", link: "/contact" },
      ];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed left-0 w-full z-[70] py-6 md:py-8 mix-blend-difference text-white transition-all duration-300 ${
          isHome ? "top-8 md:top-10" : "top-0"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Brand / Logo */}
          <Link href="/" className="relative z-[70]">
            {logo ? (
              <div className="relative w-32 h-8 md:w-56 md:h-14">
                <Image
                  src={logo}
                  alt={title}
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            ) : (
              <span className="text-xl md:text-3xl font-bold tracking-tight uppercase">
                {title}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-8 md:gap-12 text-sm md:text-base font-medium tracking-wide uppercase">
              {menu.map((item) => (
                <li key={item.link}>
                  <Link
                    href={item.link}
                    className="hover:underline underline-offset-4 decoration-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle (The "Equal" to "Box") */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-[70] w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                // Open State: Solid Box (Square)
                <motion.div
                  key="close"
                  initial={{ scale: 0, opacity: 0, rotate: -90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 bg-white"
                />
              ) : (
                // Closed State: Equal Sign (Two lines)
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-1.5"
                >
                  <span className="block w-8 h-[2px] bg-white"></span>
                  <span className="block w-8 h-[2px] bg-white"></span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Full Screen Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navItems={menu}
        theme={mobileTheme}
      />
    </>
  );
}
