import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Selector
import { changeDateFormat, slugifyName } from 'selectors';

// Components
import CommentForm from 'components/parts/commentForm/CommentForm';
import Comment from './Comment';

// Reducer
import { selectCurrentUser } from 'reducers/login/loginSlice';
import { selectNewComments } from 'reducers/post/postSlice';

// Styles
import './post.scss';

const Post = ({ post }) => {
  const currentUser = useSelector(selectCurrentUser);
  const newComments = useSelector(selectNewComments);

  const author = post.USER ? post.USER : currentUser;
  return (
    <article className="post">
      <header className="post-header">
        <p className="post-author"><Link to={'/' + slugifyName(author.firstname, author.lastname, author.id)}>{author.firstname} {author.lastname}</Link></p>
        <p className="post-date">le {changeDateFormat(post.createdAt)}</p>
      </header>
      <p className="post-content">{post.content}</p>
      <CommentForm postId={post.id}></CommentForm>

      { post.COMMENTs && post.COMMENTs.map((comment) =>
        <Comment comment={comment} key={comment.id}></Comment>
      )}
      { newComments && newComments.map((comment) => 
        comment.POSTId === post.id && <Comment comment={comment} key={comment.id}></Comment>
      )}
    </article>
  );
};

export default Post;
