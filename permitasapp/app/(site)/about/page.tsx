import { reader } from "@/app/lib/keystatic";
import TeamFeed from "@/components/team/TeamFeed";
import { Metadata } from "next";
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

  // Safety check
  if (!teamMembers) return notFound();

  return (
    <div className="w-full bg-white pt-20 pb-0 overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Introduction Section */}
        <section className="max-w-4xl mb-24">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">
            The Studio
          </h1>
          <p className="text-xl md:text-3xl leading-relaxed text-gray-900 font-light">
            We are a design practice focused on creating timeless, sustainable
            spaces that resonate with their environment. Our approach combines
            rigorous technical detail with artistic intuition.
          </p>
        </section>

        {/* Team Section Header */}
        <div className="flex items-end justify-between border-b border-black pb-4 mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Our Team
          </h2>
          <span className="text-xs font-mono text-gray-400">
            ({teamMembers.length})
          </span>
        </div>
      </div>

      {/* Team Feed - Full Width but padded inside component */}
      <section className="w-full">
        {teamMembers.length > 0 ? (
          <TeamFeed team={teamMembers} />
        ) : (
          <div className="container mx-auto px-6 md:px-12 py-10 text-gray-500">
            <p>No team members listed yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
