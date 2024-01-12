/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compiler: {
        removeConsole: false,
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
