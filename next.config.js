/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: { optimizeCss: true },
    images: {
        domains: ['imagedelivery.net'],
    }
}

module.exports = nextConfig
