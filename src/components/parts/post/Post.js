import { useSelector } from 'react-redux';

// Selector
import { changeDateFormat } from 'selectors';

// Components
import CommentForm from 'features/commentForm/CommentForm';
import Comment from './Comment';

// Reducer
import { selectUser } from 'reducers/user/userSlice';

// Styles
import './post.scss';
import { selectSended, selectSendedComments } from 'features/commentForm/commentFormSlice';

const Post = ({ post }) => {
  const user = useSelector(selectUser);
  const sended = useSelector(selectSended);
  const sendedComments = useSelector(selectSendedComments);

  return (
    <article className="post">
      <header className="post-header">
        <p className="post-author">{post.USER ? post.USER.firstname : user.firstname} {post.USER ? post.USER.lastname : user.lastname}</p>
        <p className="post-date">le {changeDateFormat(post.createdAt)}</p>
      </header>
      <p className="post-content">{post.content}</p>
      <CommentForm postId={post.id}></CommentForm>
      { sended && sendedComments.map((comment) => 
        comment.postId === post.id && <Comment comment={comment} key={comment.id}></Comment>
      )}
      { post.COMMENTs && post.COMMENTs.map((comment) => <Comment comment={comment} key={comment.id}></Comment>)}
    </article>
  );
};

export default Post;
