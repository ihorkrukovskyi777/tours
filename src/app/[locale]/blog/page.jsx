
import { blogPosts } from "@/entities/api"
import BannerBlog from "@/widgets/banner-blog/banner-blog";
import BlogPostItem from "@/shared/ui/blog-post-item/blog-post-item";


export default async function BlogPage({languages , title}) {

    const posts = await blogPosts();

    return (
        <main>
            <BannerBlog title={"blog"} />
            <BlogPostItem posts={posts} />
           
        </main>
    )
}
