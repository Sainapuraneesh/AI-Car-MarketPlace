/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {  //while adding images if u want to cache these images in next.js app,then add this experimental part inside nextConfig
    serverComponentsHmrCache: false, // defaults to true
    //suppressHydrationWarning: true,  // 👈 added this
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pmuhltjsxwufmkzcgkkb.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/embed",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://roadsidecoder.created.app;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
