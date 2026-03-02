/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local /public images (default) + external if needed
    unoptimized: false,
  },
};

module.exports = nextConfig;
