import { useSelector } from 'react-redux';

// Selector
import { changeDateFormat } from 'selectors';

// Components
import CommentForm from 'components/parts/commentForm/CommentForm';
import Comment from './Comment';

// Reducer
import { selectCurrentUser } from 'reducers/user/userSlice';
import { selectNewComments } from 'reducers/post/postSlice';

// Styles
import './post.scss';
// import { selectSended, selectSendedComments } from 'components/parts/commentForm/commentFormSlice';

const Post = ({ post }) => {
  const currentUser = useSelector(selectCurrentUser);
  const newComments = useSelector(selectNewComments);
  // const sended = useSelector(selectSended);
  // const sendedComments = useSelector(selectSendedComments);

  return (
    <article className="post">
      <header className="post-header">
        <p className="post-author">{post.USER ? post.USER.firstname : currentUser.firstname} {post.USER ? post.USER.lastname : currentUser.lastname}</p>
        <p className="post-date">le {changeDateFormat(post.createdAt)}</p>
      </header>
      <p className="post-content">{post.content}</p>
      <CommentForm postId={post.id}></CommentForm>

      { post.COMMENTs && post.COMMENTs.map((comment) => <Comment comment={comment} key={comment.id}></Comment>)}
      { newComments && newComments.map((comment) => 
        comment.POSTId === post.id && <Comment comment={comment} key={comment.id}></Comment>
      )}
    </article>
  );
};

export default Post;
