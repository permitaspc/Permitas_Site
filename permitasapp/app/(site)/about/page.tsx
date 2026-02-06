import { reader } from "@/app/lib/keystatic";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation"; // Added for safety

// FIX: Enable ISR. This updates the page cache every 60 seconds.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Studio",
  description: "About Permitas Architecture and our team.",
};

export default async function AboutPage() {
  // 1. Fetch team members
  const teamMembers = await reader.collections.team.all();

  // Safety check: if reader fails, handle gracefully (optional but recommended)
  if (!teamMembers) return notFound();

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Introduction Section */}
      <section className="max-w-3xl mb-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
          The Studio
        </h1>
        <p className="text-xl md:text-2xl leading-relaxed text-gray-800">
          We are a design practice focused on creating timeless, sustainable
          spaces that resonate with their environment. Our approach combines
          rigorous technical detail with artistic intuition.
        </p>
      </section>

      {/* Team Grid Section */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8 border-b border-gray-200 pb-4">
          Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member) => (
            <article key={member.slug} className="flex flex-col gap-4">
              <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                {member.entry.photo ? (
                  <Image
                    src={member.entry.photo}
                    alt={member.entry.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400">
                    No Photo Available
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold">{member.entry.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {member.entry.role}
                </p>
                {member.entry.bio && (
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {member.entry.bio}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {teamMembers.length === 0 && (
          <div className="py-10 text-gray-500">
            <p>No team members listed yet. Add them in the CMS.</p>
          </div>
        )}
      </section>
    </div>
  );
}
