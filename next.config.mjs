/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "static.wixstatic.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
