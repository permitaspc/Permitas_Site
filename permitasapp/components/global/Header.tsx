import Link from "next/link";

interface HeaderProps {
  siteTitle?: string;
  // In the future, we can add a logo prop here when you upload one
}

export default function Header({ siteTitle }: HeaderProps) {
  const title = siteTitle || "Permitas";

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
            <li>
              <Link
                href="/projects"
                className="hover:text-black transition-colors"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-black transition-colors"
              >
                Studio
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-black transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
