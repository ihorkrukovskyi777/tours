import { blogPosts } from "@/entities/api"
import BannerBlog from "@/entities/post/ui/banner-blog/banner-blog";
import BlogPostItems from "@/entities/post/ui/blog-post-items/blog-post-items";

export default async function BlogPage({languages , title}) {
    const posts = await blogPosts();
    return (
        <main>
            <BannerBlog/>
            <BlogPostItems posts={posts} />
        </main>
    )
}
