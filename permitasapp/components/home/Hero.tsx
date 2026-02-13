"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />{" "}
        {/* Overlay for text readability */}
        {/* Placeholder for Video - Replace src with actual asset later */}
        {/* Using a high-quality abstract architectural video placeholder or gradient */}
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-60" : "opacity-0"
          }`}
          // This is a placeholder nature/architecture abstract video
          src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4"
        />
        {/* Fallback gradient while video loads */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        )}
      </div>

      {/* Content Layer */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Narrative Headline (Mino Style) */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 uppercase leading-none">
            Bringing Your <br />
            <span className="text-gray-400">Vision to Life.</span>
          </h1>

          {/* Subheadline (Permitas Content) */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto uppercase tracking-widest font-mono">
            Expert Planning & Building Control Support Across England
          </p>

          {/* CTA Button */}
          <div className="mt-12">
            <a
              href="/contact"
              className="inline-block border border-white px-8 py-3 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-all duration-300 uppercase"
            >
              Start Your Project
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[1px] h-16 bg-white/50" />
      </motion.div>
    </section>
  );
}
