// Components
import Comment from './Comment';

// Styles
import './message.scss';

const Message = ({ message }) => {
    return (
        <article className="message">
            <header className="message-header">
                <p className="message-author">par {message.author}</p>
                <p className="message-date">le {message.date}</p>
            </header>
            <p className="message-content">{message.content}</p>
            { message.comments && message.comments.map((comment) => <Comment comment={comment} key={comment.id}></Comment>)}
        </article>
    );
};

export default Message;