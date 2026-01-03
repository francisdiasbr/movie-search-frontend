/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'themoviesearch.s3.us-east-2.amazonaws.com',
        pathname: '/stickers/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/api/sticker/**',
      },
    ],
    domains: ['themoviesearch.s3.us-east-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
