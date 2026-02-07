// app/(site)/projects/[slug]/page.tsx

import { reader } from "@/app/lib/keystatic";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DocumentRenderer } from "@keystatic/core/renderer";

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
  const project = await reader.collections.projects.read(slug);

  if (!project) notFound();

  // --- Logic: Next Project vs. Contact Page ---
  const allProjects = await reader.collections.projects.all();
  // Sort same as index page to ensure flow matches
  const sortedProjects = allProjects.sort(
    (a, b) => Number(b.entry.year) - Number(a.entry.year),
  );

  const currentIndex = sortedProjects.findIndex((p) => p.slug === slug);
  const nextProject = sortedProjects[currentIndex + 1]; // Undefined if last
  // ---------------------------------------------

  return (
    <div className="min-h-screen pb-20">
      {/* 1. Hero Section (Context First - Mino Style) */}
      <div className="h-[80vh] relative w-full">
        <Image
          src={project.coverImage || ""}
          alt={project.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white bg-gradient-to-t from-black/60 to-transparent">
          <div className="container mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm md:text-base font-mono">
              <span>{project.location}</span>
              <span>—</span>
              <span>{project.year}</span>
              <span>—</span>
              <span>{project.area} sq ft</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-12 gap-12 mt-20">
        {/* 2. Project Info Sidebar */}
        <aside className="md:col-span-3 md:sticky md:top-32 h-fit space-y-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Typology
            </h3>
            <p className="capitalize">{project.category}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Credits
            </h3>
            <p className="whitespace-pre-line">{project.credits}</p>
          </div>
        </aside>

        {/* 3. Main Content & Gallery */}
        <div className="md:col-span-8 md:col-start-5 space-y-12">
          {/* Rich Text Description */}
          <div className="prose prose-lg max-w-none prose-headings:font-normal prose-p:text-gray-600">
            <DocumentRenderer document={await project.description()} />
          </div>

          {/* Gallery Grid (Simple Stack for now, Masonry in 2.4) */}
          <div className="space-y-8">
            {project.gallery
              .filter((img): img is string => !!img) // Filter nulls & assert type
              .map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] w-full bg-gray-100"
                >
                  <Image
                    src={img}
                    alt={`${project.title} gallery ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 4. Footer Navigation (Dead End Logic) */}
      <div className="mt-32 border-t border-gray-200">
        <div className="container mx-auto px-4 py-20 flex justify-end">
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="text-right group"
            >
              <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Next Project
              </span>
              <span className="text-3xl md:text-5xl font-bold group-hover:underline decoration-1 underline-offset-4">
                {nextProject.entry.title} &rarr;
              </span>
            </Link>
          ) : (
            <Link href="/contact" className="text-right group">
              <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Work with us
              </span>
              <span className="text-3xl md:text-5xl font-bold group-hover:underline decoration-1 underline-offset-4">
                Start a Conversation &rarr;
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
