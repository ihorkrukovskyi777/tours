import { revalidateTag } from 'next/cache'

export async function GET() {
    await Promise.all([
        revalidateTag('schema'),
        revalidateTag('seo'),
        revalidateTag('flexible-content'),
        revalidateTag('footer-menu'),
        revalidateTag('section'),
    ])
    return Response.json('Cache cleared')
}