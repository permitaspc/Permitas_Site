import { reader } from "@/app/lib/keystatic";
import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import BookingWidget from "@/components/contact/BookingWidget";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with us for your next project.",
};

export default async function ContactPage() {
  // 1. Fetch Contact Page content & Global Settings
  const contactData = await reader.singletons.contactPage.read();
  const settings = await reader.singletons.settings.read();

  return (
    <div className="container mx-auto px-6 md:px-12 pt-32 pb-12 min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Column: Context & Form (Mino Style) */}
        <div className="flex flex-col">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-black">
              {contactData?.heading || "Get in Touch"}
            </h1>

            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg">
              {contactData?.subtext ||
                "Got questions, compliments, or just wanna say hi? Don't be shy. Let's make some magic happen."}
            </p>
          </div>

          <ContactForm />

          {/* Direct Contact Details (Email/Phone) */}
          <div className="mt-10 space-y-6">
            {settings?.contactEmail && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Email
                </h3>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="text-lg font-medium hover:underline decoration-1 underline-offset-4"
                >
                  {settings.contactEmail}
                </a>
              </div>
            )}

            {settings?.contactPhone && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Phone
                </h3>
                <p className="text-lg font-medium">{settings.contactPhone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Booking Widget */}
        <div className="relative h-full w-full flex flex-col justify-start pt-4">
          <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-[600px]">
            {contactData?.calendlyUrl ? (
              <BookingWidget bookingUrl={contactData.calendlyUrl} />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400">
                  Booking calendar not configured.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
