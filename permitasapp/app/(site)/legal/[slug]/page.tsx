import { reader } from "@/app/lib/keystatic";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// 1. Define allowed legal pages
// Since 'legal' is a Singleton with specific fields, we manually map the slugs
const VALID_PAGES = ["privacy-policy", "terms-of-service"] as const;

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

  // 2. Validate Slug
  // If the user tries /legal/random-text, we 404 immediately
  if (!VALID_PAGES.includes(params.slug as any)) {
    notFound();
  }

  // 3. Fetch Legal Data
  const legalData = await reader.singletons.legal.read();

  // 4. Select the correct content based on slug
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
        {/* Logic: If content exists in CMS, show placeholder (renderer comes in Phase 2). Else show empty state. */}
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
