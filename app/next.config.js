/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/signin",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
