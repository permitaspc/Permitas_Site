"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useState } from "react";
import CustomProjectCursor from "@/components/global/CustomProjectCursor";

interface FeaturedProjectData {
  slug: string;
  entry: {
    title: string;
    category: string;
    status: string;
    coverImage: string | null;
  };
}

interface FeaturedProjectsGridProps {
  projects: FeaturedProjectData[];
}

export default function FeaturedProjectsGrid({ projects }: FeaturedProjectsGridProps) {
  const [isCursorActive, setIsCursorActive] = useState(false);

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-white/20 rounded-lg">
        <p className="text-gray-500 mb-4">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <CustomProjectCursor isActive={isCursorActive} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard 
            key={project.slug} 
            project={project} 
            onHoverChange={setIsCursorActive}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ 
  project, 
  onHoverChange 
}: { 
  project: FeaturedProjectData;
  onHoverChange: (isHovered: boolean) => void;
}) {
  return (
    <div
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className="relative"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block"
      >
        {/* Image Placeholder / Card */}
        <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden mb-4 border border-white/10 group-hover:border-white/30 transition-colors">
          {/* If we had an image, it would go here. For now, a subtle gradient. */}
          {!project.entry.coverImage && (
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-neutral-900 group-hover:scale-105 transition-transform duration-700" />
          )}

          {/* Real Image if available */}
          {project.entry.coverImage && (
            <NextImage
              src={project.entry.coverImage}
              alt={project.entry.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
          )}

          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <span className="px-2 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest">
              {project.entry.status}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="pointer-events-none">
          <h3 className="text-xl font-bold uppercase tracking-tight group-hover:underline underline-offset-4 decoration-1">
            {project.entry.title}
          </h3>
          <span className="text-sm text-gray-500 capitalize font-mono">
            {project.entry.category}
          </span>
        </div>
      </Link>
    </div>
  );
}
