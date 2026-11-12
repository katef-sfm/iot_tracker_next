import type { NextConfig } from "next";
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  reactStrictMode: true,
  allowedDevOrigins: ['iot-tracker.duo.cloud', 'iot-tracker.duo.io', 'iot-tracker.duo.local', '*.duo.cloud', '**.duo.cloud'],
  crossOrigin: 'anonymous',
};

export default nextConfig;
