/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'd1qml5tdie7qey.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'http.cat',
      },
    ],
  },
}

module.exports = nextConfig
