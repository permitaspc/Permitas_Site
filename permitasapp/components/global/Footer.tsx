"use client";

import Link from "next/link";

interface FooterProps {
  contactEmail?: string;
  contactPhone?: string;
  socialInstagram?: string;
  socialFacebook?: string;
  footerText?: string;
  siteTitle?: string;
  designedByText?: string;
  designedByLink?: string;
}

export default function Footer({
  contactEmail,
  contactPhone,
  socialInstagram,
  socialFacebook,
  footerText,
  siteTitle,
  designedByText,
  designedByLink,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  console.log(
    "[Debug] Rendering Global Footer, socialFacebook:",
    socialFacebook,
  );
  console.log("[Debug] Designed By Text:", designedByText);
  console.log("[Debug] Designed By Link:", designedByLink);

  return (
    <footer className="relative z-50 bg-black text-white px-6 md:px-12 py-24 md:py-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          {/* Left: Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-widest text-gray-500 mb-6">
              MENU
            </h3>
            <nav className="flex flex-col gap-2 text-2xl md:text-3xl font-bold">
              <Link href="/" className="hover:text-gray-400 transition-colors">
                Home
              </Link>
              <Link
                href="/projects"
                className="hover:text-gray-400 transition-colors"
              >
                Work
              </Link>
              <Link
                href="/about"
                className="hover:text-gray-400 transition-colors"
              >
                Studio
              </Link>
              <Link
                href="/contact"
                className="hover:text-gray-400 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right: Contact Info */}
          <div className="md:text-right space-y-12">
            <div>
              <h3 className="text-sm font-bold tracking-widest text-gray-500 mb-6">
                CONTACT
              </h3>
              <a
                href={`mailto:${contactEmail || "hello@permitas.com"}`}
                className="block text-xl md:text-2xl hover:underline mb-2"
              >
                {contactEmail || "hello@permitas.com"}
              </a>
              <a
                href={`tel:${contactPhone || "+91 000 000 0000"}`}
                className="block text-xl md:text-2xl hover:underline"
              >
                {contactPhone || "+91 000 000 0000"}
              </a>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-widest text-gray-500 mb-6">
                SOCIAL
              </h3>
              <div className="flex md:justify-end gap-6 text-lg">
                {socialInstagram && (
                  <a
                    href={socialInstagram}
                    target="_blank"
                    className="hover:text-gray-400"
                  >
                    Instagram ↗
                  </a>
                )}
                {socialFacebook && (
                  <a
                    href={socialFacebook}
                    target="_blank"
                    className="hover:text-gray-400"
                  >
                    Facebook ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Massive Footer Logo */}
        <div className="border-t border-white/20 pt-12">
          <h1 className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-center md:text-left select-none">
            {siteTitle || "PERMITAS"}
          </h1>
          <div className="flex justify-between text-xs md:text-sm font-mono text-gray-500 mt-4 uppercase">
            <span>
              © {currentYear} {footerText || "Permitas. All Rights Reserved."}
            </span>
            <span>
              {designedByLink ? (
                <a 
                  href={designedByLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  {designedByText || "Designed by Permitas"}
                </a>
              ) : (
                designedByText || "Designed by Permitas"
              )}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
