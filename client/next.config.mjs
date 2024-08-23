/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental',
    after: true,
  },
  basePath: '/raceday2',
  crossOrigin: 'anonymous',
  async headers() {
    return [
      {
        // matching all API routes
        source: '/raceday2/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'false' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date',
          },
        ],
      },
    ]
  },
}

export default nextConfig
