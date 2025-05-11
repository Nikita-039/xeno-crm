/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/segments/:path*',
        destination: 'https://xeno-crm-4-vlo4.onrender.com/'
      },
      {
        source: '/api/campaigns/:path*', // ✅ this is what’s missing
        destination: 'https://xeno-crm-4-vlo4.onrender.com/'
      }
    ];
  }
};

module.exports = nextConfig;


