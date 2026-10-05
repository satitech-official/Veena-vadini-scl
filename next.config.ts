import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // CMS image records are rendered with short-lived signed URLs from the
    // project's private Supabase Storage buckets. The path is intentionally
    // constrained while the query string remains available for signatures.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/sign/**",
      },
    ],
  },
  experimental: {
    // Admin assets are validated to much smaller per-file limits in the server
    // action. This only raises Next's transport ceiling above its 1 MB default.
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
