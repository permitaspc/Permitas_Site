import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 1. "The Safety Net": Use Sharp for fast resizing
    // Ensure 'sharp' is installed in package.json

    // 2. "Smoothness": High-efficiency formats first
    formats: ["image/avif", "image/webp"],

    // 3. "Architectural Precision": Custom breakpoints
    // We include 3840px (4K) for large monitors, but strict steps for mobile
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // 4. "Grid Optimization": Smaller sizes for the Masonry thumbnails
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // 5. "Dynamic Future-Proofing": Ready for Cloud (Uncomment when needed)
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: '**.amazonaws.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'res.cloudinary.com',
      // },
    ],
  },
};

export default nextConfig;
