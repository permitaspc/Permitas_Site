interface FooterProps {
  contactEmail?: string;
  contactPhone?: string;
  socialInstagram?: string;
  socialLinkedIn?: string;
  footerText?: string;
}

export default function Footer({
  contactEmail,
  contactPhone,
  socialInstagram,
  socialLinkedIn,
  footerText,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-100 py-12 mt-20 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Copyright */}
        <div className="flex flex-col justify-end">
          <p className="text-sm text-gray-400">
            &copy; {currentYear}{" "}
            {footerText || "Permitas Architecture. All rights reserved."}
          </p>
        </div>

        {/* Right: Dynamic Contact Info */}
        <div className="flex flex-col md:items-end gap-4 text-sm">
          {contactEmail && (
            <a href={`mailto:${contactEmail}`} className="hover:underline">
              {contactEmail}
            </a>
          )}
          {contactPhone && (
            <span className="text-gray-600">{contactPhone}</span>
          )}

          <div className="flex gap-4 mt-2">
            {socialInstagram && (
              <a
                href={socialInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black"
              >
                Instagram
              </a>
            )}
            {socialLinkedIn && (
              <a
                href={socialLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
