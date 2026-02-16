import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker optimization
  output: "standalone",
  
  // Ensure proper file tracing for standalone (moved from experimental in Next.js 16)
  outputFileTracingIncludes: {
    "/*": ["./node_modules/**/*"],
  },
};

export default nextConfig;
