/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/**',
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        pathname: "/system/resources/**",
      }
    ],
  },
};

export default nextConfig;
