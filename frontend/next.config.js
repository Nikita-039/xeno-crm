/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/segments/:path*',
        destination: 'http://localhost:5000/api/segments/:path*'
      },
      {
        source: '/api/campaigns/:path*', // ✅ this is what’s missing
        destination: 'http://localhost:5000/api/campaigns/:path*'
      }
    ];
  }
};

module.exports = nextConfig;


