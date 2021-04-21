import Message from "../message/Message";

const Wall = ({ messages, children }) => {  
    return (
        <section className="main">
            {children}
            { messages.map((message) => (
                <Message message={message} key={message.id}></Message>
            ))}
        </section>
    );
};

export default Wall;