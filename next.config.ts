import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker optimization
  output: "standalone",
  
  // Disable telemetry
  telemetry: false,
  
  // Ensure proper file tracing for standalone
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./node_modules/**/*"],
    },
  },
};

export default nextConfig;
