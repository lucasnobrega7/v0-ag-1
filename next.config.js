/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removido swcMinify pois não é mais suportado no Next.js 15.x
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost", "storage.googleapis.com", "railway.app"],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // Adicionado https:// ao início do destination
        destination: "https://api.agentesdeconversao.com.br/:path*",
      },
    ]
  },
  // Configuração para múltiplos domínios
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*.agentesdeconversao.com.br",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
