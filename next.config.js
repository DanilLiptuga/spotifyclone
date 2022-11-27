/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack5: true,
  swcMinify: true,
  images: {
    domains: [
      "localhost",
      "127.0.0.1",
      "via.placeholder.com",
      "picsum.photos",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
