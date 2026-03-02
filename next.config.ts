import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Turbopack expects project-relative aliases (not absolute paths).
    resolveAlias: {
      "react-router-dom": "./src/shims/react-router-dom",
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-router-dom": path.resolve(__dirname, "src/shims/react-router-dom"),
    };
    return config;
  },
};

export default nextConfig;
