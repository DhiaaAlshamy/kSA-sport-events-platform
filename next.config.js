/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,

    remotePatterns: [
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "www.google.com" },
      // Add more hostnames as needed
    ],
  },
};

module.exports = nextConfig;
