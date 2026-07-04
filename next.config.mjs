/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "abdullah-al-alamin.vercel.app" },
    ],
  },
};

export default nextConfig;