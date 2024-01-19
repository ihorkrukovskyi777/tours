import { blogPosts } from "@/entities/api"
import BannerBlog from "@/widgets/banner-blog/banner-blog";
import BlogPostItems from "@/shared/ui/blog-post-items/blog-post-items";

export default async function BlogPage({languages , title}) {
    const posts = await blogPosts();
    return (
        <main>
            <BannerBlog/>
            <BlogPostItems posts={posts} />
           
        </main>
    )
}
