import { reader } from "@/app/lib/keystatic";

export default async function Home() {
  // 1. Fetch data from the "Home Page" Singleton
  const homeData = await reader.singletons.homePage.read();

  // 2. Fetch list of all projects
  const projects = await reader.collections.projects.all();

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
          No projects found. Go to{" "}
          <a href="/keystatic" className="underline font-bold">
            /keystatic
          </a>{" "}
          and create one!
        </p>
      )}
    </div>
  );
}
