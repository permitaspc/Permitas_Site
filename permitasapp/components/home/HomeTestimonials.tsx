"use client";

const testimonials = [
  {
    quote:
      "Working with Permitas was a great experience. Their knowledge of planning regulations combined with creative solutions helped us get approval on a difficult site.",
    author: "James H.",
    role: "Homeowner, London",
  },
  {
    quote:
      "Excellent work, communication was always super easy and efficient. They really made our job easy! The drawing pack was professional and validated immediately.",
    author: "Sarah T.",
    role: "Property Developer",
  },
  {
    quote:
      "You leave the consultation knowing exactly what is achievable. No nasty surprises later. A rare level of care and commitment in this industry.",
    author: "Michael R.",
    role: "Architectural Lead",
  },
];

export default function HomeTestimonials() {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 border-t border-white/10">
      <div className="container mx-auto">
        <h2 className="text-sm font-mono text-gray-400 tracking-widest uppercase mb-16">
          (03) Trusted By Clients
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col justify-between">
              <p className="text-xl md:text-2xl leading-relaxed font-norma mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto">
                <p className="font-bold uppercase tracking-wider">{t.author}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
