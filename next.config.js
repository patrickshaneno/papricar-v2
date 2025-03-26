const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'papricar.supabase.co']
  },
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        destination: '/',
        permanent: false,
      },
    ]
  }
}

module.exports = withPWA(nextConfig) 