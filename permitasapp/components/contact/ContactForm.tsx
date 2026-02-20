"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          ...formData,
          from_name: "Permitas Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="group relative">
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b border-gray-300 py-3 text-base sm:text-lg md:text-xl outline-none transition-colors focus:border-black placeholder-transparent"
            placeholder="Your Name"
          />
          <label
            htmlFor="name"
            className="absolute left-0 top-3 text-base sm:text-lg md:text-xl text-gray-400 transition-all duration-300 -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:text-black peer-focus:text-xs"
          >
            Your Name
          </label>
        </div>

        {/* Email Field */}
        <div className="group relative">
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b border-gray-300 py-3 text-base sm:text-lg md:text-xl outline-none transition-colors focus:border-black placeholder-transparent"
            placeholder="Email Address"
          />
          <label
            htmlFor="email"
            className="absolute left-0 top-3 text-base sm:text-lg md:text-xl text-gray-400 transition-all duration-300 -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:text-black peer-focus:text-xs"
          >
            Email Address
          </label>
        </div>

        {/* Phone Field (Optional) */}
        <div className="group relative">
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b border-gray-300 py-3 text-base sm:text-lg md:text-xl outline-none transition-colors focus:border-black placeholder-transparent"
            placeholder="Phone Number"
          />
          <label
            htmlFor="phone"
            className="absolute left-0 top-3 text-base sm:text-lg md:text-xl text-gray-400 transition-all duration-300 -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:text-black peer-focus:text-xs"
          >
            Phone Number (Optional)
          </label>
        </div>

        {/* Message Field */}
        <div className="group relative">
          <textarea
            name="message"
            id="message"
            required
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b border-gray-300 py-3 text-base sm:text-lg md:text-xl outline-none resize-none transition-colors focus:border-black placeholder-transparent"
            placeholder="Tell us about your next project"
          />
          <label
            htmlFor="message"
            className="absolute left-0 top-3 text-base sm:text-lg md:text-xl text-gray-400 transition-all duration-300 -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:text-black peer-focus:text-xs"
          >
            Tell us about your next project
          </label>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <div className="pt-2">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full bg-black text-white py-4 px-6 rounded-full flex items-center justify-center gap-3"
              >
                <Check className="w-5 h-5" />
                <span className="text-base font-medium tracking-wide uppercase">
                  THANK YOU!
                </span>
              </motion.div>
            ) : (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 px-6 rounded-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="text-base font-medium tracking-wide uppercase">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
                {!isSubmitting && (
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
