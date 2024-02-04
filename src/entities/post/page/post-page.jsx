import BannerBlog from "@/entities/post/ui/banner-blog/banner-blog";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import PostContent from "@/entities/post/ui/post-content/post-content";
import Footer from "@/shared/ui/layouts/footer/footer";
import { singlePost } from "@/entities/api";

export default async function PostPage({ languages, title, id , locale}) {

    const data = await singlePost(id);
    const {attachment , content} = data;

    return (
        <div className="content">
            <BannerBlog title={title} image={attachment} />
            <PostContent>{content}</PostContent>
            <I18nChangeOfLanguage locale={locale} languages={languages} title={title}/>
            <Footer locale={locale}/>
        </div>
    )
}
