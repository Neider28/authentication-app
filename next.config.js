/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
      },
    ],
  },
  env: {
    API_AUTH: 'https://auth-backend-liart.vercel.app',
  }
}

module.exports = nextConfig
