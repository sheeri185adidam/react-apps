import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, selectFetchPostsError, selectFetchPostsStatus, selectPosts } from './postsSlice'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { PostAuthor } from './postAuthor';
import { PostDate } from './postDate';
import { Spinner } from '../../components/Spinner';
import { ReactionButtons } from './reactionButtons';

const Post = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <PostDate timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post}/>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
};

export const PostList = () => {
  const posts = useSelector(selectPosts)
  const dispatch = useDispatch()
  const fetchStatus = useSelector(selectFetchPostsStatus)
  const fetchError = useSelector(selectFetchPostsError);

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [fetchStatus, dispatch])

  let content

  if (fetchStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (fetchStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <Post key={post.id} post={post} />
    ))
  } else if (fetchStatus === 'failed') {
    content = <div>{fetchError}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
