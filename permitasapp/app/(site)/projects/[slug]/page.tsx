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
  // const settings = await reader.singletons.settings.read(); // Unused

  if (!project) notFound();

  const content = await project.description();

  // Next Project Logic
  const allProjects = await reader.collections.projects.all();
  const sorted = allProjects.sort(
    (a, b) => Number(b.entry.year) - Number(a.entry.year),
  );
  const currentIndex = sorted.findIndex((p) => p.slug === slug);
  const nextProject = sorted[currentIndex + 1] || sorted[0];

  console.log(
    `[Debug] Next Project for ${slug}: ${nextProject?.slug} (Title: ${nextProject?.entry.title})`,
  );

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
        <div className="bg-white w-full min-h-screen pt-24 pb-0">
          <div className="container mx-auto px-6 md:px-12 pb-32">
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

            {/* NEXT PROJECT NAV: Visual Preview */}
          </div>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group relative block w-full h-[60vh] overflow-hidden"
          >
            <Image
              src={nextProject.entry.coverImage || ""}
              alt={nextProject.entry.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 text-center">
              <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-4 opacity-80">
                Next Project
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                {nextProject.entry.title}
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
