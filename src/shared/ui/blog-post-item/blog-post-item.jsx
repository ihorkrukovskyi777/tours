import Post from "./post";
import './style.css';

export default function BlogPostItem({posts}) {

    return (
        <div className="container">
            <div className="blog-posts">
                {posts?.map((item => <Post key={item.slug} data={item} />))}
            </div>
        </div>
    )
}
