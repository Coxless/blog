import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workshop のトンネル経由で http://127.0.0.1:5173 から開発サーバーを開くため
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
