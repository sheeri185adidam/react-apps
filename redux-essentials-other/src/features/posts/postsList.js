import { Link } from 'react-router-dom'
import React, { useMemo } from 'react'
import { PostAuthor } from './postAuthor'
import { PostDate } from './postDate'
import { Spinner } from '../../components/Spinner'
import { ReactionButtons } from './reactionButtons'
import { useGetPostsQuery } from '../api/apiSlice'
import classNames from 'classnames'

const Post = ({ post }) => {
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
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => (
      <Post key={post.id} post={post} />
    ))

    const containerClassname = classNames('posts-container', {
      disabled: isFetching
    })

    content = <div className={containerClassname}>{renderedPosts}</div>

  } else if (isError) {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
