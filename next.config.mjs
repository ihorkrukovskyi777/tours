/** @type {import('next').NextConfig} */
import {PAID_TOUR_IN_CITY} from "./src/i18n/path-rewrites/paid-tour-in-city.mjs";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites() {
        return {
            afterFiles: [
                ...PAID_TOUR_IN_CITY.paths.map(path => {
                    return  {
                        source: `/${path.locale}/${path.source}`,
                        destination: `${PAID_TOUR_IN_CITY.slug}`,
                    }
                }),

            ],

        }
    },

    reactStrictMode: false,
    experimental: {optimizeCss: true},
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
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
}

export default withNextIntl(nextConfig);
