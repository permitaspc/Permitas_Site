import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import { DocumentRenderer } from '@keystatic/core/renderer';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function PrivacyPolicyPage() {
  const data = await reader.singletons.legal.read();

  if (!data) return <div>Page under construction</div>;

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose mb-12">
        <DocumentRenderer document={await data.privacyPolicyText()} />
      </div>
    </main>
  );
}
