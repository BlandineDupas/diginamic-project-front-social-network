import { useSelector } from "react-redux";

import { changeDateFormat } from "../../../selectors";

// Reducer
import { selectUser } from "../../../reducers/user/userSlice";

const Comment = ({ comment }) => {
    const user = useSelector(selectUser);

    return (
        <article className="comment">
            <header>
                <p>
                    <span className="comment-author">{comment.USER ? comment.USER.firstname : user.firstname} {comment.USER ? comment.USER.lastname : user.lastname}</span>
                    , le 
                    <span className="comment-date"> {changeDateFormat(comment.createdAt)}</span>
                </p>
            </header>
            <p className="comment-content">{comment.content}</p>
        </article>
    );
};

export default Comment;
