/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: { optimizeCss: true },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imagedelivery.net',
            },
        ],
    }
}

module.exports = nextConfig
