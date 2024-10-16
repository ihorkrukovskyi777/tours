import { revalidateTag } from 'next/cache'

export async function GET() {
    await Promise.all([
        revalidateTag('faq-section'),
    ])
    return Response.json('Cache cleared')
}