import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { Link } from "react-router-dom";
import { PostAuthor } from "./postAuthor";
import { PostDate } from "./postDate";

export const PostPage = ({ match }) => {
    const { postId } = match.params;

    const post = useSelector(selectPostById(postId));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <div>
                    <PostAuthor userId={post.userId}/>
                    <PostDate timestamp={post.date}></PostDate>
                </div>
                <p className="post-content">{post.content}</p>
                <Link to={`/posts/${post.id}/edit`} className="button muted-button">Edit Post</Link>
            </article>
        </section>
    )
}