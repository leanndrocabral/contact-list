/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
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
