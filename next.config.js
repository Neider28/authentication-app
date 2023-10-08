/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'auth-backend-smoky.vercel.app',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
  env: {
    // API_AUTH: 'https://auth-backend-smoky.vercel.app',
    API_AUTH: 'http://localhost:4000',
  }
}

module.exports = nextConfig
