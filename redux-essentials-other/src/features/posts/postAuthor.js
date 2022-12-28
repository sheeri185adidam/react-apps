import { useSelector } from "react-redux"
import { selectUser } from "../users/usersSlice"

export const PostAuthor = ({ userId }) => {

    const author = useSelector(selectUser(userId));

    return (
        <span>by {author ? author.name : 'Unknown author'}</span>
    );
}