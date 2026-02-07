// app/lib/mock-data.ts
// Define the type based on your Keystatic schema
type ProjectEntry = {
  slug: string;
  entry: {
    title: string;
    coverImage: string;
    location: string;
    category: "residential" | "commercial" | "interior" | "landscape"; // Matches schema
    year: string;
    status: "completed" | "construction" | "concept";
  };
};

export const MOCK_PROJECTS: ProjectEntry[] = [
  {
    slug: "le-mirage",
    entry: {
      title: "Le Mirage",
      coverImage:
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
      location: "Dubai, UAE",
      category: "commercial",
      year: "2025",
      status: "completed",
    },
  },
  {
    slug: "azure-villa",
    entry: {
      title: "Azure Villa",
      coverImage:
        "https://images.unsplash.com/photo-1600596542815-e36cb0654136?q=80&w=2574&auto=format&fit=crop",
      location: "Kerala, India",
      category: "residential",
      year: "2024",
      status: "completed",
    },
  },
  {
    slug: "urban-heights",
    entry: {
      title: "Urban Heights",
      coverImage:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
      location: "Bangalore, India",
      category: "residential",
      year: "2023",
      status: "construction",
    },
  },
];
