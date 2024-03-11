/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: { optimizeCss: false },
    // compiler: {
    //     removeConsole: {
    //         exclude: ['error'],
    //     },
    // },
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
