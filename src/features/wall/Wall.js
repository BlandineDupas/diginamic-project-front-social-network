import Message from "../message/Message";

const Wall = ({ messages }) => {
    return (
        <section className="main">
            { messages.map((message) => (
                <Message message={message} key={message.id}></Message>
            ))}
        </section>
    );
};

export default Wall;