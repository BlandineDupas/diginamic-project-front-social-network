import { useSelector } from "react-redux";

// Components
import Message from "../message/Message";

// Styles
import './home.scss';

// Reducer
import { selectUser } from "../login/loginSlice";

let messages = [
    {
        content: "je suis un message e suis un message e suis un message e suis un message e suis un message",
        author: "Blandine",
        date: "25/05/1994",
        comments: [
            {
                content: "commentaire",
                author: "Blandine",
                date: "25/05/1994"
            },  
            {
                content: "commentaire",
                author: "Blandine",
                date: "25/05/1994"
            },  
            {
                content: "commentaire",
                author: "Blandine",
                date: "25/05/1994"
            }
        ]
    },
    {
        content: "je suis un message je suis un message e suis un message e suis un message e suis un message e suis un message je suis un message e suis un message e suis un message e suis un message e suis un message",
        author: "Agnès",
        date: "25/05/1904"
    },
    {
        content: "je suis un message",
        author: "François",
        date: "25/05/2004"
    },
    {
        content: "je suis un message",
        author: "Pierre-Jean",
        date: "25/05/2000"
    }
];

const Home = ({ title }) => {
    const user = useSelector(selectUser);

    return (
        <div className="home">
            <header>
                <h1>{title}</h1>
                <p>Connecté en tant que {user.firstname} {user.lastname}</p>
            </header>
            <aside className="aside-left">
                <h1>Mes amis</h1>
                <div>
                    <ul>
                        <li>Prénom Nom</li>
                        <li>Prénom Nom</li>
                        <li>Prénom Nom</li>
                        <li>Prénom Nom</li>
                    </ul>
                </div>
                <h1>Invitations</h1>
                <ul>
                    <li>Prénom Nom</li>
                    <li>Prénom Nom</li>
                    <li>Prénom Nom</li>
                    <li>Prénom Nom</li>
                </ul>
            </aside>
            <section className="main">
                { messages.map((message) => (
                    <Message message={message} key={message.date}></Message>
                ))}
            </section>
            <aside className="aside-right">
                <h1>Messages privés</h1>
            </aside>
        </div>
    );
};

export default Home;