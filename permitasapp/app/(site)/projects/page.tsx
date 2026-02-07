import { reader } from "@/app/lib/keystatic";
import ProjectFeed from "@/components/projects/ProjectFeed";
import { MOCK_PROJECTS } from "@/app/lib/mock-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected architectural projects and case studies.",
};

export default async function ProjectsPage() {
  // 1. Fetch Projects
  const realProjects = await reader.collections.projects.all();

  // LOGIC: Use Mock if Real is Empty
  const rawProjects = realProjects.length > 0 ? realProjects : MOCK_PROJECTS;

  // 2. Data Sanitization
  const cleanProjects = rawProjects.map((project) => ({
    slug: project.slug,
    entry: {
      title: project.entry.title,
      coverImage: project.entry.coverImage,
      location: project.entry.location,
      category: project.entry.category,
      year: project.entry.year,
    },
  }));

  const sortedProjects = cleanProjects.sort((a, b) => {
    return Number(b.entry.year) - Number(a.entry.year);
  });

  return (
    <div className="w-full bg-white pt-32 pb-20">
      {/* HEADER: "Selected Works"
        - Moves with the page (not fixed)
        - Clean Typography based on image 29c942
        - Container restricted only for text alignment
      */}
      <div className="container mx-auto px-6 md:px-12 mb-20 flex justify-between items-end">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-black leading-none">
          Selected Works
        </h1>
        <span className="hidden md:block text-sm font-bold tracking-widest uppercase mb-2">
          (Works)
        </span>
      </div>

      {/* FEED: Full Width Images
        - Passed sorted projects to the client component
      */}
      <ProjectFeed projects={sortedProjects} />
    </div>
  );
}
