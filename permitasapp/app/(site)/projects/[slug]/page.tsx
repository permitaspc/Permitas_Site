import { reader } from "@/app/lib/keystatic";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { DocumentRenderer } from "@keystatic/core/renderer";
import Image from "next/image";

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

  // 4. Resolve the Rich Text Content
  // In Keystatic, the content field is a function we must await
  const content = await project.description();

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

        {/* Production Ready: Rich Text Content */}
        <div className="prose prose-lg max-w-none mb-20">
          <DocumentRenderer document={content} />
        </div>

        {/* Production Ready: Image Gallery */}
        {project.gallery.length > 0 && (
          <section className="border-t border-gray-100 pt-16">
            <h3 className="text-2xl font-bold mb-8">Project Gallery</h3>
            <div className="grid grid-cols-1 gap-12">
              {/* FILTER: Remove nulls first so TypeScript knows 'image' is safe */}
              {project.gallery
                .filter((img): img is string => img !== null)
                .map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-[16/9] bg-gray-50 rounded-lg overflow-hidden shadow-sm"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - View ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 90vw"
                    />
                  </div>
                ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
