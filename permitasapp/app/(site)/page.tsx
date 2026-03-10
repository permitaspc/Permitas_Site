import { reader } from "@/app/lib/keystatic";
import Link from "next/link";
import NextImage from "next/image";
import { Metadata } from "next";

// Import new Home Components
import Hero from "@/components/home/Hero";
import MissionStatement from "@/components/home/MissionStatement";
import ServicesPillars from "@/components/home/ServicesPillars";
import ProcessFlow from "@/components/home/ProcessFlow";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import FeaturedProjectsGrid from "@/components/home/FeaturedProjectsGrid";

export const metadata: Metadata = {
  title: "Permitas | Planning & Design",
  description: "Expert Planning & Building Control Support Across England",
};

export default async function Home() {
  // 1. Fetch Homepage Singleton Data
  const homeData = await reader.singletons.homePage.read();

  // DEBUG LOGGING (User Request)
  console.log("------------------------------------------------");
  console.log("DEBUG [Home]: Fetched Singleton Data");
  console.log(
    "Hero Video File:",
    homeData?.heroVideoFile ? "Uploaded" : "None",
  );
  console.log(
    "Hero Video URL:",
    homeData?.heroVideoUrl ? "Present" : "Missing",
  );
  console.log(
    "Mission Lines:",
    homeData?.missionLine1,
    homeData?.missionLine2,
    homeData?.missionLine3,
  );
  console.log("Services Count:", homeData?.services?.length ?? 0);
  console.log("Process Steps Count:", homeData?.processSteps?.length ?? 0);
  console.log("------------------------------------------------");

  // 2. Resolve Featured Projects
  // If user selected projects in CMS, use them. Otherwise, fallback to latest 3.
  const allProjects = await reader.collections.projects.all();
  let rawFeaturedProjects = [];

  if (homeData?.featuredProjects && homeData.featuredProjects.length > 0) {
    // Filter all projects to find the selected ones, preserving order if possible or just filtering
    // Note: Keystatic relationship returns an array of slugs (strings)
    const selectedSlugs = homeData.featuredProjects.filter(
      (s): s is string => typeof s === "string",
    );
    rawFeaturedProjects = allProjects.filter((p) =>
      selectedSlugs.includes(p.slug),
    );
  } else {
    // Fallback: Recent 3
    rawFeaturedProjects = allProjects.slice(0, 3);
  }

  // 2.1 Sanitize Data to prevent React Serialization Error (500 Error Fix)
  const featuredProjects = rawFeaturedProjects.map((project) => ({
    slug: project.slug,
    entry: {
      title: project.entry.title,
      coverImage: project.entry.coverImage,
      category: project.entry.category,
      status: project.entry.status,
    },
  }));

  // DEBUG LOGGING - Projects
  console.log("DEBUG [Home]: Featured Projects (Sanitized client-safe data)");
  featuredProjects.forEach((p) => {
    console.log(`- Project: ${p.entry.title}, Image: ${p.entry.coverImage}`);
  });

  // 3. Resolve Testimonials (Inline Priority over Collection)
  const allTestimonials = await reader.collections.testimonials.all();
  let displayTestimonials = [];

  if (homeData?.inlineTestimonials && homeData.inlineTestimonials.length > 0) {
    // Map inline to expected component format
    displayTestimonials = homeData.inlineTestimonials.map((t, idx) => ({
      slug: `inline-${idx}`,
      entry: {
        client: t.author,
        quote: t.quote,
      },
    }));
  } else if (
    homeData?.testimonialSelection &&
    homeData.testimonialSelection.length > 0
  ) {
    // Filter out potential [null] entries Keystatic returns when an empty array is saved
    const selectedSlugs = homeData.testimonialSelection.filter(
      (s): s is string => typeof s === "string",
    );

    if (selectedSlugs.length > 0) {
      displayTestimonials = allTestimonials.filter((t) =>
        selectedSlugs.includes(t.slug),
      );
    } else {
      displayTestimonials = allTestimonials;
    }
  } else {
    // Fallback: All
    displayTestimonials = allTestimonials;
  }

  // DEBUG LOGGING - Testimonials
  console.log("------------------------------------------------");
  console.log("DEBUG [Home]: Testimonials Section Setup");
  console.log("DEBUG [Home]: Testimonials Count:", displayTestimonials.length);
  console.log(
    "DEBUG [Home]: Testimonial Heading:",
    homeData?.testimonialHeading,
  );
  console.log("------------------------------------------------");

  return (
    // WRAPPER: Force Dark Theme for Homepage Only
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Hero
        headline={homeData?.heroHeadline}
        subhead={homeData?.heroSubhead}
        videoFile={homeData?.heroVideoFile}
        videoUrl={homeData?.heroVideoUrl}
        fallbackImage={homeData?.heroImage}
      />

      <MissionStatement
        line1={homeData?.missionLine1}
        line2={homeData?.missionLine2}
        line3={homeData?.missionLine3}
        body={homeData?.missionBody}
      />

      <ServicesPillars services={homeData?.services} />

      <ProcessFlow steps={homeData?.processSteps} />

      {/* Selected Works - Re-styled for Dark Theme */}
      <section className="container mx-auto px-6 md:px-12 py-24 border-t border-white/10">
        <h2 className="text-sm font-mono text-gray-400 tracking-widest uppercase mb-16 text-left">
          (04) Selected Works
        </h2>

        <FeaturedProjectsGrid projects={featuredProjects} />
      </section>

      <HomeTestimonials
        items={displayTestimonials}
        heading={homeData?.testimonialHeading}
      />
    </div>
  );
}
