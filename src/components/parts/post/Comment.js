import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

// Selectors
import { changeDateFormat, slugifyName } from "selectors";

// Reducer
import { selectCurrentUser } from "reducers/login/loginSlice";

const Comment = ({ comment }) => {
  const currentUser = useSelector(selectCurrentUser);
  
  const author = comment.USER ? comment.USER : currentUser;

  return (
    <article className="comment">
      <header>
        <p>
          <Link className="comment-author" to={'/' + slugifyName(author.firstname, author.lastname, author.id)}>{author.firstname} {author.lastname}</Link>
          , le 
          <span className="comment-date"> {changeDateFormat(comment.createdAt)}</span>
        </p>
      </header>
      <p className="comment-content">{comment.content}</p>
    </article>
  );
};

export default Comment;
