// app/(site)/projects/[slug]/page.tsx
import { reader } from "@/app/lib/keystatic";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DocumentRenderer } from "@keystatic/core/renderer";
import ParallaxImage from "@/components/projects/ParallaxImage";

export async function generateStaticParams() {
  const projects = await reader.collections.projects.all();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await reader.collections.projects.read(slug);
  if (!project) return { title: "Project Not Found" };
  return { title: `${project.title} - Permitas` };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(
    `[Debug] Rendering Project Page for slug: ${slug} at ${new Date().toISOString()}`,
  );
  const project = await reader.collections.projects.read(slug);
  const settings = await reader.singletons.settings.read();

  if (!project) notFound();

  const content = await project.description();

  // Next Project Logic
  const allProjects = await reader.collections.projects.all();
  const sorted = allProjects.sort(
    (a, b) => Number(b.entry.year) - Number(a.entry.year),
  );
  const currentIndex = sorted.findIndex((p) => p.slug === slug);
  const nextProject = sorted[currentIndex + 1] || sorted[0];

  return (
    <main className="bg-white min-h-screen w-full relative">
      {/* LAYER 0: FIXED HERO (The "Curtain" Background) 
        This stays stuck at the top while the rest scrolls over it.
      */}
      <div className="fixed inset-0 z-0 h-screen w-full">
        <div className="relative w-full h-full">
          <Image
            src={project.coverImage || ""}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />{" "}
          {/* Slight dim for text pop */}
          {/* Option 3A: Massive Graphic Title inside Hero */}
          {/* FIX: Increased bottom padding to push text 'up' into the visible safe zone */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-40 md:pb-48">
            <div className="container mx-auto">
              {/* FIX: Removed 'mix-blend-overlay' so text is solid white. Added drop-shadow for legibility. */}
              <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter text-white drop-shadow-md">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 1: SCROLLABLE CONTENT 
        Starts with a transparent spacer, then the white sheet slides up.
      */}
      <div className="relative z-10">
        {/* Transparent Spacer: Allows seeing the Fixed Hero for the first 100vh */}
        <div className="h-[90vh] w-full pointer-events-none" />

        {/* The White Sheet: Slides up over the image */}
        <div className="bg-white w-full min-h-screen pt-24 pb-32 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12">
              {/* LEFT COLUMN: Compact & Bold Info (Option 4B) */}
              <aside className="md:col-span-3">
                <div className="md:sticky md:top-32 space-y-10">
                  {/* Clean, Bold Metadata Block */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block">
                      Location
                    </span>
                    <span className="text-2xl font-bold leading-none">
                      {project.location}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block">
                      Year
                    </span>
                    <span className="text-2xl font-bold leading-none">
                      {project.year}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block">
                      Area
                    </span>
                    <span className="text-2xl font-bold leading-none">
                      {project.area}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        sq ft
                      </span>
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block">
                      Typology
                    </span>
                    <span className="text-2xl font-bold leading-none capitalize">
                      {project.category}
                    </span>
                  </div>

                  <div className="pt-8 border-t border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                      Credits
                    </span>
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-line text-gray-600">
                      {project.credits ||
                        "Lead Architect: Permitas\nVisualization: Permitas Studio"}
                    </p>
                  </div>
                </div>
              </aside>

              {/* RIGHT COLUMN: Editorial & Gallery */}
              <div className="md:col-span-8 md:col-start-5 space-y-32">
                {/* 1. Editorial Text (Option 2B - Large) */}
                <div className="prose prose-xl prose-stone max-w-none">
                  <DocumentRenderer document={content} />
                </div>

                {/* 2. Parallax Gallery (Option 3A) */}
                <div className="space-y-0">
                  {project.gallery
                    .filter((img): img is string => !!img)
                    .map((image, index) => (
                      <ParallaxImage
                        key={index}
                        src={image}
                        alt={`${project.title} detail ${index + 1}`}
                      />
                    ))}
                </div>
              </div>
            </div>

            {/* NEXT PROJECT NAV (Option 4B - Minimal Button) */}
            <div className="mt-40 border-t border-black pt-12 flex justify-between items-baseline">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
                Next Project
              </span>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group text-4xl md:text-6xl font-bold hover:text-gray-500 transition-colors text-right"
              >
                {nextProject.entry.title}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-4">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* NEW: CONTACT / FOOTER SECTION (Mino Style) */}
        {/* FIX: Added 'relative z-50' to force this section ABOVE the fixed hero image visually. */}
        <div className="relative z-50 bg-black text-white px-6 md:px-12 py-24 md:py-32">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
              {/* Left: Navigation */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-widest text-gray-500 mb-6">
                  MENU
                </h3>
                <nav className="flex flex-col gap-2 text-2xl md:text-3xl font-bold">
                  <Link
                    href="/"
                    className="hover:text-gray-400 transition-colors"
                  >
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
                    href={`mailto:${settings?.contactEmail}`}
                    className="block text-xl md:text-2xl hover:underline mb-2"
                  >
                    {settings?.contactEmail || "hello@permitas.com"}
                  </a>
                  <a
                    href={`tel:${settings?.contactPhone}`}
                    className="block text-xl md:text-2xl hover:underline"
                  >
                    {settings?.contactPhone || "+91 000 000 0000"}
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-bold tracking-widest text-gray-500 mb-6">
                    SOCIAL
                  </h3>
                  <div className="flex md:justify-end gap-6 text-lg">
                    {settings?.socialInstagram && (
                      <a
                        href={settings.socialInstagram}
                        target="_blank"
                        className="hover:text-gray-400"
                      >
                        Instagram ↗
                      </a>
                    )}
                    {settings?.socialLinkedIn && (
                      <a
                        href={settings.socialLinkedIn}
                        target="_blank"
                        className="hover:text-gray-400"
                      >
                        LinkedIn ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Massive Footer Logo */}
            <div className="border-t border-white/20 pt-12">
              <h1 className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-center md:text-left select-none">
                {settings?.siteTitle || "PERMITAS"}
              </h1>
              <div className="flex justify-between text-xs md:text-sm font-mono text-gray-500 mt-4 uppercase">
                <span>
                  © {new Date().getFullYear()} Permitas. All Rights Reserved.
                </span>
                <span>Designed by Permitas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
