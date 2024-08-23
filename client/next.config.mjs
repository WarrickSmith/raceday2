/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental',
    after: true,
  },
  basePath: '/raceday2',
}

export default nextConfig
