/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "e-commerce-backend-nestjs-postgres.onrender.com",
      },
      {
        protocol: "https", // Cloudinary uses HTTPS protocol
        hostname: "res.cloudinary.com", // Cloudinary hostname
      },
    ],
  },
};

export default nextConfig;
