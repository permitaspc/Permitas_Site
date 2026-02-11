"use client";

import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
}

export default function StatsBar({ stats }: { stats: readonly StatItem[] }) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="w-full border-y border-gray-200 bg-gray-50/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200/50">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="py-8 md:py-12 px-4 text-center md:text-left flex flex-col justify-center"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="block text-3xl md:text-5xl font-bold tracking-tighter text-black mb-1"
              >
                {stat.value}
              </motion.span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
