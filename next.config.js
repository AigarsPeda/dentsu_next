/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compress: false,
  // swcMinify: false,
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
      {
        protocol: "http",
        hostname: "dentsu.lv",
      },
      {
        protocol: "https",
        hostname: "dentsu.lv",
      },
      {
        protocol: "https",
        hostname: "www.dentsu.lv",
      },
      {
        protocol: "http",
        hostname: "www.dentsu.lv",
      },
    ],
  },
  // Add canonical headers
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.dentsu.lv",
          },
        ],
        destination: "https://dentsu.lv/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // Root path
        source: "/",
        headers: [
          {
            key: "Link",
            value: '<https://dentsu.lv>; rel="canonical"',
          },
        ],
      },
      {
        // All other paths
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value: '<https://dentsu.lv/:path*>; rel="canonical"',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
