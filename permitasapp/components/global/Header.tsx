import Link from "next/link";

interface HeaderProps {
  siteTitle?: string;
  // Update to accept the immutable data structure from Keystatic
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
    <header className="w-full border-b border-gray-100 py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Brand / Logo Area */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          {title}
        </Link>

        {/* Navigation - Structural Links */}
        <nav>
          <ul className="flex gap-8 text-sm font-medium text-gray-600">
            {menu.map((item) => (
              <li key={item.link}>
                <Link
                  href={item.link}
                  className="hover:text-black transition-colors"
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
