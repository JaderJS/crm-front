/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,

  pageExtensions: ["page.tsx", "api.ts", "api.tsx"],

  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },

  env: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    WS_ENDPOINT: process.env.WS_ENDPOINT,
    BOARD_CENTRAL_DE_PROJETOS: process.env.BOARD_CENTRAL_DE_PROJETOS,
  },

  
}

module.exports = nextConfig


