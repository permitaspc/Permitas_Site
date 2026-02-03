import { reader } from "@/app/lib/keystatic";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// 1. Define allowed legal pages as a constant array
const VALID_PAGES = ["privacy-policy", "terms-of-service"] as const;

// 2. Create a Type Guard to check if a string is a valid slug
// This allows us to safely check the slug without using 'any'
function isValidSlug(slug: string): slug is (typeof VALID_PAGES)[number] {
  return VALID_PAGES.includes(slug as (typeof VALID_PAGES)[number]);
}

export async function generateStaticParams() {
  return VALID_PAGES.map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const title =
    params.slug === "privacy-policy" ? "Privacy Policy" : "Terms of Service";

  return {
    title,
    description: `Legal documentation: ${title}`,
  };
}

export default async function LegalPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  // 3. Strict Validation (Production Ready)
  // If the slug is not in our allowlist, 404 immediately.
  if (!isValidSlug(params.slug)) {
    console.error(`Invalid legal page accessed: ${params.slug}`); // Debug log
    notFound();
  }

  const legalData = await reader.singletons.legal.read();

  const content =
    params.slug === "privacy-policy"
      ? legalData?.privacyPolicy
      : legalData?.termsOfService;

  const pageTitle =
    params.slug === "privacy-policy" ? "Privacy Policy" : "Terms of Service";

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8">
        {pageTitle}
      </h1>

      <div className="prose prose-lg prose-gray max-w-none">
        {content ? (
          <div className="bg-gray-50 p-6 rounded border border-gray-100 text-gray-500 italic">
            <p>
              [Legal text content will be rendered here via Keystatic Document
              Renderer in Phase 2]
            </p>
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No content has been added for this page yet. Please update via the
            CMS.
          </p>
        )}
      </div>

      <p className="mt-12 text-sm text-gray-400 border-t pt-4">
        Last Updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
