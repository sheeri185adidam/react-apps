import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPosts,
  selectFetchPostsError,
  selectFetchPostsStatus,
  selectPostById,
  selectPostIds,
} from './postsSlice'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { PostAuthor } from './postAuthor'
import { PostDate } from './postDate'
import { Spinner } from '../../components/Spinner'
import { ReactionButtons } from './reactionButtons'

const Post = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId))
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <PostDate timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostList = () => {
  const orderedPostIds = useSelector(selectPostIds)
  const dispatch = useDispatch()
  const fetchStatus = useSelector(selectFetchPostsStatus)
  const fetchError = useSelector(selectFetchPostsError)

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [fetchStatus, dispatch])

  let content

  if (fetchStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (fetchStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => (
      <Post key={postId} postId={postId} />
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
