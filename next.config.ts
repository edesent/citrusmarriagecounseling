import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the root so Turbopack never picks up a parent folder's lockfile.
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    // Short, guessable addresses for flyers and conversation.
    return [
      { source: "/premarital", destination: "/premarital-counseling", permanent: true },
      { source: "/marriage-counseling", destination: "/christian-marriage-counseling", permanent: true },
      { source: "/about", destination: "/pastor-brandon-bankert", permanent: true },
      { source: "/contact", destination: "/free-consultation", permanent: true },
      { source: "/consultation", destination: "/free-consultation", permanent: true },
    ];
  },
};

export default nextConfig;
