// Components
import { changeDateFormat } from '../../selectors';
import CommentForm from '../commentForm/CommentForm';
import Comment from './Comment';

// Styles
import './message.scss';

const Message = ({ message }) => {
    return (
        <article className="message">
            <header className="message-header">
                <p className="message-author">{message.USER.firstname} {message.USER.lastname}</p>
                <p className="message-date">le {changeDateFormat(message.createdAt)}</p>
            </header>
            <p className="message-content">{message.content}</p>
            <CommentForm messageId={message.id}></CommentForm>
            { message.COMMENTs && message.COMMENTs.map((comment) => <Comment comment={comment} key={comment.id}></Comment>)}
        </article>
    );
};

export default Message;