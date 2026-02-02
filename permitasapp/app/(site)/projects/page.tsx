import { reader } from "@/app/lib/keystatic";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected architectural projects and case studies.",
};

export default async function ProjectsPage() {
  // 1. Fetch all projects from the CMS
  const projects = await reader.collections.projects.all();

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">
        Selected Work
      </h1>

      {/* 2. The Grid Structure (Scaffolding for Design Phase) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block"
          >
            {/* Minimal Card Placeholder */}
            <article className="border border-gray-200 p-6 h-64 flex flex-col justify-end hover:border-black transition-colors">
              <h2 className="text-xl font-bold">{project.entry.title}</h2>
              <p className="text-sm text-gray-500 capitalize mt-1">
                {project.entry.status}
              </p>
            </article>
          </Link>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          <p>No projects published yet.</p>
        </div>
      )}
    </div>
  );
}
