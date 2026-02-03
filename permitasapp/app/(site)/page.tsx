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

  console.log(`[DEBUG] Projects found: ${projects.length}`); // Debug log

  return (
    <div className="p-10 font-sans">
      <h1 className="text-4xl font-bold mb-4">
        {homeData?.heroHeadline || "Permitas Architecture"}
      </h1>
      <p className="text-xl mb-8">{homeData?.heroSubhead}</p>

      <h2 className="text-2xl font-bold mb-4">Project Debug List:</h2>
      <ul className="list-disc pl-5">
        {projects.map((project) => (
          <li key={project.slug}>
            {project.entry.title} ({project.entry.status})
          </li>
        ))}
      </ul>

      {projects.length === 0 && (
        <p className="text-yellow-600 bg-yellow-100 p-4 rounded">
          {/* CORRECTED: Using <Link> instead of <a> */}
          No projects found. Go to{" "}
          <Link href="/keystatic" className="underline font-bold">
            /keystatic
          </Link>{" "}
          and create one!
        </p>
      )}
    </div>
  );
}
