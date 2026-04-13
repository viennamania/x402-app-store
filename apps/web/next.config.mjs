/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true
  },
  transpilePackages: ["@repo/ui"]
};

export default nextConfig;
