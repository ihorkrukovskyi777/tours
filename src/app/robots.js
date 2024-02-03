export default function robots() {
    if(process.env.NEXT_PUBLIC_ROBOTS_TXT === 'dev') {
        return {
            rules: {
                userAgent: '*',
                disallow: '/',
            }
        }
    }
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/v1/',
        },
        sitemap: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap.xml`,
    }
}