import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['bcryptjs', '@prisma/client', '@prisma/adapter-pg', 'pg'],
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
