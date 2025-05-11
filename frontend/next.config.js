/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/segments/:path*',
        destination: 'https://xeno-crm-4-vlo4.onrender.com/api/segments/:path*',
      },
      {
        source: '/api/campaigns/:path*',
        destination: 'https://xeno-crm-4-vlo4.onrender.com/api/campaigns/:path*',
      }
    ];
  }
};

module.exports = nextConfig;


