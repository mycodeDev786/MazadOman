/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "export",
  images: {
    domains: ["flagcdn.com"],
    unoptimized: true, // Required for static export if you're using <Image />
  },
};

export default nextConfig;
