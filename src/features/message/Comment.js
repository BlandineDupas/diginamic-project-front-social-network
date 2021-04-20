const Comment = ({ comment }) => {
    return (
        <article className="comment">
            <header>
                <p>
                    <span className="comment-author">par {comment.author}</span>
                    , le 
                    <span className="comment-date"> {comment.date}</span>
                </p>
            </header>
            <p className="comment-content">{comment.content}</p>
        </article>
    );
};

export default Comment;