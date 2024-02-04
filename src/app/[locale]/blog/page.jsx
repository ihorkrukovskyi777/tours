import { blogPosts } from "@/entities/api"
import BannerBlog from "@/entities/post/ui/banner-blog/banner-blog";
import BlogPostItems from "@/entities/post/ui/blog-post-items/blog-post-items";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import Footer from "@/shared/ui/layouts/footer/footer";
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
