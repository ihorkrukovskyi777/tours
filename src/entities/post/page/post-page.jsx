'use client'
import BannerBlog from "@/entities/post/ui/banner-blog/banner-blog";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import PostContent from "@/entities/post/ui/post-content/post-content";
import Footer from "@/shared/ui/layouts/footer/footer";
import { singlePost } from "@/entities/api";
import './style.css'
export default async function PostPage({ languages, title, id , locale}) {

    const data = await singlePost(id);
    const {attachment , content} = data;

    function addParagraphTags(text) {
        let paragraphs = text.split('\n');
        let paragraphsWithTag = paragraphs.map(function(paragraph) {
            return '<p>' + paragraph + '</p>';
        });
        return paragraphsWithTag.join('\n');
    }
    const htmlTextFull = addParagraphTags(content);


    return (
        <div className="content">
            <BannerBlog title={title} image={attachment} />
            <PostContent>{htmlTextFull}</PostContent>
            <I18nChangeOfLanguage locale={locale} languages={languages.map((item) => ({...item, title: 'Free Tour'}))} title={''}/>
            <Footer locale={locale}/>
        </div>
    )
}
