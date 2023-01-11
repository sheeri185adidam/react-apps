import { Link } from 'react-router-dom'
import { PostAuthor } from './postAuthor'
import { PostDate } from './postDate'
import { useGetPostQuery } from '../api/apiSlice'
import { Spinner } from '../../components/Spinner'

export const PostPage = ({ match }) => {
  const { postId } = match.params

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

  let content
  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.userId} />
          <PostDate timestamp={post.date}></PostDate>
        </div>
        <p className="post-content">{post.content}</p>
        <Link to={`/posts/${post.id}/edit`} className="button muted-button">
          Edit Post
        </Link>
      </article>
    )
  }
  return <section>{content}</section>
}
