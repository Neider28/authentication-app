/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
  env: {
    API_AUTH: 'https://auth-backend-smoky.vercel.app',
  }
}

module.exports = nextConfig
