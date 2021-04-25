import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import PostForm from "../../components/parts/postForm/PostForm";
import Wall from "../../components/parts/wall/Wall";

// Styles
import './home.scss';

// Reducer
import { selectToken } from "../../reducers/user/userSlice";
import {
    fetchMessagesAsync,
    selectMessagesList
} from "./homeSlice";
import {
    clearSendedMessages,
    selectSended,
    selectSendedMessages
} from "../../components/parts/postForm/postFormSlice";
import Message from "../../components/parts/post/Post";
import { clearSendedComments } from "../commentForm/commentFormSlice";

const Home = ({ title, userId }) => {
    const dispatch = useDispatch();
    const messagesList = useSelector(selectMessagesList);
    const token = useSelector(selectToken);
    const sended = useSelector(selectSended);
    const sendedMessages = useSelector(selectSendedMessages);

    useEffect(() => {
        dispatch(fetchMessagesAsync({
            token,
            userId
        }));
        dispatch(clearSendedMessages());
        dispatch(clearSendedComments());
    }, [title])
    
    return (
        <div className="home">
            <header>
                <h1>{title}</h1>
                <PostForm></PostForm>
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
            { title === 'Accueil' && <Wall messages={messagesList}></Wall>}
            { title !== 'Accueil' && 
                <Wall messages={messagesList}>
                    {sended && sendedMessages.map((message) => (
                        <Message message={message} key={message.id}></Message>
                    ))}
                </Wall>
            }
            <aside className="aside-right">
                <h1>Messages privés</h1>
            </aside>
        </div>
    );
};

export default Home;
