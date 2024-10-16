/** @type {import('next').NextConfig} */

const nextConfig = {
  // webpack: (config) => {
  //   config.resolve.alias.canvas = false;

  //   return config;
  // },
  output: "standalone",
  compress: false,
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "http",
        hostname: "206.81.28.146",
      },
      {
        protocol: "http",
        hostname: "134.122.83.203",
      },
    ],
  },
};

module.exports = nextConfig;
