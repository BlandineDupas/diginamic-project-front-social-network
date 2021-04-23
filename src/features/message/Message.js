import { useSelector } from 'react-redux';

// Selector
import { changeDateFormat } from '../../selectors';

// Components
import CommentForm from '../commentForm/CommentForm';
import Comment from './Comment';

// Reducer
import { selectUser } from '../../reducers/user/userSlice';

// Styles
import './message.scss';
import { selectSended, selectSendedComments } from '../commentForm/commentFormSlice';

const Message = ({ message }) => {
    const user = useSelector(selectUser);
    const sended = useSelector(selectSended);
    const sendedComments = useSelector(selectSendedComments);

    return (
        <article className="message">
            <header className="message-header">
                <p className="message-author">{message.USER ? message.USER.firstname : user.firstname} {message.USER ? message.USER.lastname : user.lastname}</p>
                <p className="message-date">le {changeDateFormat(message.createdAt)}</p>
            </header>
            <p className="message-content">{message.content}</p>
            <CommentForm messageId={message.id}></CommentForm>
            { sended && sendedComments.map((comment) => 
                comment.MESSAGEId === message.id && <Comment comment={comment} key={comment.id}></Comment>
            )}
            { message.COMMENTs && message.COMMENTs.map((comment) => <Comment comment={comment} key={comment.id}></Comment>)}
        </article>
    );
};

export default Message;