// components/global/Header.tsx
import Link from "next/link";

interface HeaderProps {
  siteTitle?: string;
  navItems?: readonly { readonly label: string; readonly link: string }[];
}

export default function Header({ siteTitle, navItems }: HeaderProps) {
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
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold tracking-tight uppercase"
        >
          {title}
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
