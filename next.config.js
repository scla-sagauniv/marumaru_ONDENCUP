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
        hostname: 'marumaru-onden-prod.s3.ap-northeast-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
