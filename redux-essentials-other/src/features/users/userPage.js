import { useSelector } from 'react-redux'
import { selectUser } from './usersSlice'
import { selectPostsByUserId } from '../posts/postsSlice'
import { Link } from 'react-router-dom'

export const UserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector(selectUser(userId))
  const posts = useSelector(selectPostsByUserId(userId))

  const userPosts = posts.map((post) => {
    return (
      <li key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </li>
    )
  })

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{userPosts}</ul>
    </section>
  )
}
