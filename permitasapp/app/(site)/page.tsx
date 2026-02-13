import { reader } from "@/app/lib/keystatic";
import Link from "next/link"; // Required import
import { Metadata } from "next";

// Import new Home Components
import Hero from "@/components/home/Hero";
import MissionStatement from "@/components/home/MissionStatement";
import ServicesPillars from "@/components/home/ServicesPillars";
import ProcessFlow from "@/components/home/ProcessFlow";
import HomeTestimonials from "@/components/home/HomeTestimonials";

export const metadata: Metadata = {
  title: "Permitas | Planning & Design",
  description: "Expert Planning & Building Control Support Across England",
};

export default async function Home() {
  // We basically ignore the old 'homeData' singleton for now as we are hardcoding the new structure per the design plan
  // But we still fetch projects for the 'Selected Works' section
  const projects = await reader.collections.projects.all();

  return (
    // WRAPPER: Force Dark Theme for Homepage Only
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Hero />

      <MissionStatement />

      <ServicesPillars />

      <ProcessFlow />

      {/* Selected Works - Re-styled for Dark Theme */}
      <section className="container mx-auto px-6 md:px-12 py-24 border-t border-white/10">
        <h2 className="text-sm font-mono text-gray-400 tracking-widest uppercase mb-16 text-left">
          (04) Selected Works
        </h2>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block"
              >
                {/* Image Placeholder / Card */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden mb-4 border border-white/10 group-hover:border-white/30 transition-colors">
                  {/* If we had an image, it would go here. For now, a subtle gradient. */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-neutral-900 group-hover:scale-105 transition-transform duration-700" />

                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest">
                      {project.entry.status}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight group-hover:underline underline-offset-4 decoration-1">
                    {project.entry.title}
                  </h3>
                  <span className="text-sm text-gray-500 capitalize font-mono">
                    {project.entry.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/20 rounded-lg">
            <p className="text-gray-500 mb-4">No projects found.</p>
          </div>
        )}
      </section>

      <HomeTestimonials />
    </div>
  );
}
