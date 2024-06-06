/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "as-doors.ru",
      },
      {
        protocol: "https",
        hostname: "dveribunker.ru",
      },
      {
        protocol: "https",
        hostname: "dveri-ratibor.ru",
      },
      {
        protocol: "https",
        hostname: "xn--80aeahafcjmeq0c7ah.xn--p1ai",
      },
      {
        protocol: "https",
        hostname: "labirintdoors.ru",
      },
      {
        protocol: "https",
        hostname: "rex-doors.ru",
      },
      {
        protocol: "https",
        hostname: "intecron.ru",
      },
    ],
  },
};

export default nextConfig;
