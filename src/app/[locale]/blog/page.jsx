import { blogPosts } from "@/entities/api"
import BannerBlog from "@/entities/post/ui/banner-blog/banner-blog";
import BlogPostItems from "@/entities/post/ui/blog-post-items/blog-post-items";
import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language";
import {createTranslation} from "@/i18n/server";
import Footer from "@/shared/ui/layouts/footer/footer";
export default async function BlogPage() {
    const {t} = await createTranslation()
    const posts = await blogPosts();
    const languages = [{ locale: 'en', slug: 'blog', id: 1}, { locale: 'es', slug: 'blog', id: 2}]
    return (
        <main>
            <BannerBlog/>
            <BlogPostItems posts={posts} />
            <ChangeOfLanguage languages={languages} title={t('Blog')}/>
            <Footer />
        </main>
    )
}
