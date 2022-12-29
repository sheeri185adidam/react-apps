import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import { selectPostsByUserId } from '../posts/postsSlice'
import { Link } from 'react-router-dom'

export const UserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector(state => selectUserById(state, userId))
  const posts = useSelector(state => selectPostsByUserId(state, userId))

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
