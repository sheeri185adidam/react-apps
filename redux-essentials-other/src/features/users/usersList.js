import { useSelector } from "react-redux"
import { selectUsers } from "./usersSlice"
import { Link } from "react-router-dom";

export const UsersList = () => {
    const users = useSelector(selectUsers);
  
    const renderedUsers = users.map(user => (
      <li key={user.id}>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </li>
    ))
  
    return (
      <section>
        <h2>Users</h2>
  
        <ul>{renderedUsers}</ul>
      </section>
    )
  }