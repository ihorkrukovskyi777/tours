import BannerBlog from "@/widgets/banner-blog/banner-blog";
import ChangeOfLanguage from "@/widgets/change-of-language/change-of-language";
import { singlePost } from "@/entities/api";
import PostContent from "@/widgets/post-content/post-content";

export default async function PostPage({ languages, title, id , locale}) {

    const data = await singlePost(id);
    const {attachment , content} = data;
  
    return (
        <div className="content">
            <BannerBlog title={title} image={attachment} />
            <PostContent>{content}</PostContent>
            <ChangeOfLanguage languages={languages} title={title}/>
        </div>
    )
}
