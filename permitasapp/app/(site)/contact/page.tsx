import { reader } from "@/app/lib/keystatic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with us for your next project.",
};

export default async function ContactPage() {
  // 1. Fetch Contact Page content & Global Settings
  const contactData = await reader.singletons.contactPage.read();
  const settings = await reader.singletons.settings.read();

  return (
    <div className="container mx-auto px-4 pt-20 pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Column: Context & Info */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
            {contactData?.heading || "Get in Touch"}
          </h1>

          <p className="text-xl text-gray-800 mb-12 leading-relaxed max-w-md">
            {contactData?.subtext ||
              "We are currently accepting new projects. Tell us about your vision."}
          </p>

          <div className="space-y-8">
            {/* Email Block */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
                Email
              </h3>
              {settings?.contactEmail ? (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="text-2xl font-medium hover:underline"
                >
                  {settings.contactEmail}
                </a>
              ) : (
                <span className="text-gray-400">Email not set in settings</span>
              )}
            </div>

            {/* Phone Block */}
            {settings?.contactPhone && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Phone
                </h3>
                <p className="text-2xl font-medium">{settings.contactPhone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Form / Booking Area */}
        <div className="bg-gray-50 p-10 rounded-lg min-h-[400px] flex items-center justify-center border border-gray-100">
          {/* Production Ready: Conditional Action Card */}
          {contactData?.calendlyUrl ? (
            <div className="text-center w-full">
              <h3 className="text-2xl font-bold mb-4">Book a Consultation</h3>
              <p className="text-gray-600 mb-8">
                Schedule a 30-minute discovery call to discuss your project
                requirements.
              </p>
              <a
                href={contactData.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                Schedule Now →
              </a>
            </div>
          ) : (
            <div className="text-center opacity-50">
              <p>No booking link available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
