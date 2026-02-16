// components/global/Header.tsx
import Link from "next/link";

import Image from "next/image";

interface HeaderProps {
  siteTitle?: string;
  logo?: string | null;
  navItems?: readonly { readonly label: string; readonly link: string }[];
}

export default function Header({ siteTitle, logo, navItems }: HeaderProps) {
  const title = siteTitle || "Permitas";
  const menu = navItems?.length
    ? navItems
    : [
        { label: "Work", link: "/projects" },
        { label: "Studio", link: "/about" },
        { label: "Contact", link: "/contact" },
      ];

  return (
    // FIXED position + mix-blend-mode: difference is the secret to the "Negative" effect
    <header className="fixed top-0 left-0 w-full z-50 py-8 mix-blend-difference text-white">
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand / Logo */}
        <Link href="/" className="relative z-50">
          {logo ? (
            <div className="relative w-40 h-10 md:w-56 md:h-14">
              <Image
                src={logo}
                alt={title}
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          ) : (
            <span className="text-2xl md:text-3xl font-bold tracking-tight uppercase">
              {title}
            </span>
          )}
        </Link>

        {/* Navigation */}
        <nav>
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
      </div>
    </header>
  );
}
