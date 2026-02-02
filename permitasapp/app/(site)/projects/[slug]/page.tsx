import { reader } from "@/app/lib/keystatic";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// 1. Generate Static Params
// This tells Next.js which pages to build at compile time (SSG)
// Example: returns [{ slug: 'test-house' }, { slug: 'another-project' }]
export async function generateStaticParams() {
  const slugs = await reader.collections.projects.list();
  return slugs.map((slug) => ({ slug }));
}

// 2. Dynamic Metadata
// Fetches the specific project title for the browser tab
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const project = await reader.collections.projects.read(params.slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: `Architectural case study: ${project.title}`,
  };
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const project = await reader.collections.projects.read(params.slug);

  // 3. 404 Handling
  // If a user types a random URL, send them to the 404 page
  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <article>
        {/* Header Section */}
        <header className="mb-16 max-w-4xl">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 block">
            {project.status} — {project.year}
          </span>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8">
            {project.title}
          </h1>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-gray-100 py-6 text-sm">
            <div>
              <span className="block text-gray-400 mb-1">Location</span>
              <span className="font-medium">{project.location}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1">Typology</span>
              <span className="font-medium capitalize">{project.category}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1">Area</span>
              <span className="font-medium">{project.area || "N/A"}</span>
            </div>
            <div>
              <span className="block text-gray-400 mb-1">Credits</span>
              <span className="font-medium">
                {project.credits || "Permitas"}
              </span>
            </div>
          </div>
        </header>

        {/* Content Placeholder */}
        {/* In Phase 2, we will add the Rich Text Renderer and Image Gallery here */}
        <div className="prose prose-lg max-w-none text-gray-500 italic bg-gray-50 p-10 rounded border border-gray-100">
          <p>
            [Project Description and Gallery will be rendered here in Phase 2]
          </p>
        </div>
      </article>
    </div>
  );
}
