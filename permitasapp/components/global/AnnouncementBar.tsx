"use client";

import { usePathname } from "next/navigation";

export default function AnnouncementBar() {
  const pathname = usePathname();

  // Only render on the homepage
  if (pathname !== "/") return null;

  return (
    <div className="fixed top-0 left-0 w-full h-8 md:h-10 bg-white text-black z-[60] flex items-center justify-center px-4 shadow-sm">
      <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-center w-full truncate sm:overflow-visible sm:whitespace-normal">
        Pre-Launch preview, project currently in final development phase
      </p>
    </div>
  );
}
