import { changeDateFormat } from "../../selectors";

const Comment = ({ comment }) => {
    return (
        <article className="comment">
            <header>
                <p>
                    <span className="comment-author">{comment.USER.firstname} {comment.USER.lastname}</span>
                    , le 
                    <span className="comment-date"> {changeDateFormat(comment.createdAt)}</span>
                </p>
            </header>
            <p className="comment-content">{comment.content}</p>
        </article>
    );
};

export default Comment;