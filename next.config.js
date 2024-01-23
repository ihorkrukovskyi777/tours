/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: { optimizeCss: true },
    swcMinify: true,
    compiler: {
        removeConsole: {
            exclude: ['error'],
        },
    },
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
