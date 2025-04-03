import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "http" as const,
        hostname: "toptrener.mosuda.sk",
      },
    ],
  },
  modularizeImports: {
    // Transform `import { map } from 'lodash'` to `import map from 'lodash/map'`
    lodash: {
      transform: "lodash/{{member}}",
    },
  },
};

export default withNextIntl(nextConfig);
