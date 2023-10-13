/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rukminim1.flixcart.com',
      },
      {
        protocol: 'https',
        hostname: 'galapagos-pro.com',
      },
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
};

module.exports = nextConfig;
