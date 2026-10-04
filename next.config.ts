import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project screenshots are served straight from the repos on GitHub.
    remotePatterns: [new URL("https://raw.githubusercontent.com/AsadShibli/**")],
  },
};

export default nextConfig;
