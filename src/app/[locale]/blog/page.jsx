import { blogPosts } from "@/entities/api"
import BannerBlog from "@/entities/post/ui/banner-blog/banner-blog";
import BlogPostItems from "@/entities/post/ui/blog-post-items/blog-post-items";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import Footer from "@/shared/ui/layouts/footer/footer";
import {seoLocales} from "@/shared/constants/locales-seo";
export default async function BlogPage({ params: {locale} }) {
    const posts = await blogPosts();

    const languages = [{ locale: 'en', slug: 'blog', id: 1}, { locale: 'es', slug: 'blog', id: 2}]
    return (
        <main>
            <BannerBlog locale={locale}/>
            <BlogPostItems posts={posts} />
            <I18nChangeOfLanguage locale={locale} languages={languages} title='Blog'/>
            <Footer />
        </main>
    )
}

export async function generateMetadata({ params : {locale} }) {
const canonical = `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${locale === 'en' ? '' : `/${locale}`}/blog`
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_CANONICAL_DOMAIN),
        robots: {index: true, follow: true, 'max-image-preview': true, 'max-snippet': 1, 'max-video-preview': -1},
        title: 'Blog | Strawberry Tours',
        // description: seo.description,
        openGraph: {
            url: canonical,
            locale: seoLocales[locale]
        },
        // verification: {
        //     google: isIndexation ? 'mQKRBl_GbVi0Ly3Xwl9-M1pVM5Jm5y1O9Koi7Pj54M8' : '',
        // },
        // alternates: {
        //     canonical,
        //     languages,
        // }
    }
}