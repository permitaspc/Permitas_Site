import { reader } from "@/app/lib/keystatic";
import { notFound } from "next/navigation";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { Metadata } from "next";

export async function generateStaticParams() {
  // The legal singleton has two fixed pages in this setup
  return [{ slug: "privacy" }, { slug: "terms" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug !== "privacy" && slug !== "terms") {
    return { title: "Not Found" };
  }

  const title = slug === "privacy" ? "Privacy Policy" : "Terms of Service";
  return { title: `${title} - Permitas` };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug !== "privacy" && slug !== "terms") {
    notFound();
  }

  const legalData = await reader.singletons.legal.read();

  if (!legalData) {
    notFound();
  }

  // Determine which document to render based on the slug
  const docToRender =
    slug === "privacy" ? legalData.privacyPolicy : legalData.termsOfService;

  const title = slug === "privacy" ? "Privacy Policy" : "Terms of Service";

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 pt-32 sm:pt-40 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12 text-black">
          {title}
        </h1>

        <div className="prose prose-lg max-w-none prose-headings:font-normal prose-p:text-gray-600 prose-a:text-black hover:prose-a:text-gray-600 transition-colors">
          <DocumentRenderer document={await docToRender()} />
        </div>
      </div>
    </div>
  );
}
