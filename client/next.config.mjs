/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental',
    // ppr: true,
    // dynamicIO: true,
  },
  basePath: '/raceday2',
  crossOrigin: 'anonymous',
  output: 'standalone',
}

export default nextConfig
