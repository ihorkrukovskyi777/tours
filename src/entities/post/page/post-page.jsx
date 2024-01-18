import ChangeOfLanguage from "@/widgets/change-of-language/change-of-language";

export default async function PostPage({ languages, title, id , locale}) {
    return (<div>
        <h1>{title}</h1>
        <ChangeOfLanguage languages={languages} title={title}/>
    </div>)
}
