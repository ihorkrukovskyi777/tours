
import { blogPosts } from "@/entities/api"
import BannerBlog from "@/widgets/banner-blog/banner-blog";
import BlogPostItems from "@/shared/ui/blog-post-items/blog-post-items";


export default async function BlogPage() {

    const posts = await blogPosts();

    return (
        <main>
            <BannerBlog title={"blog"} />
            <BlogPostItems posts={posts} />
           
        </main>
    )
}
