import { reader } from "@/app/lib/keystatic";
import Link from "next/link"; // Required import
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Permitas Architecture Portfolio",
};

export default async function Home() {
  const homeData = await reader.singletons.homePage.read();
  const projects = await reader.collections.projects.all();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-24 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900">
            {homeData?.heroHeadline || "Permitas Architecture"}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            {homeData?.heroSubhead}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 pt-20 pb-0">
        <h2 className="text-3xl font-bold mb-10 border-b pb-4">
          Selected Works
        </h2>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                {/* Title Area */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {project.entry.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="capitalize">{project.entry.category}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        project.entry.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {project.entry.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">
              No projects have been published yet.
            </p>
            <Link
              href="/keystatic"
              className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Open CMS to Add Projects
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
