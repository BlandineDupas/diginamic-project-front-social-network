import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import PostForm from "../postForm/PostForm";
import Wall from "../wall/Wall";

// Styles
import './home.scss';

// Reducer
import { selectToken } from "../login/loginSlice";
import {
    fetchMessagesAsync,
    selectMessagesList
} from "./homeSlice";

// let messages = [
//     {
//         content: "je suis un message e suis un message e suis un message e suis un message e suis un message",
//         author: "Blandine",
//         date: "25/05/1994",
//         comments: [
//             {
//                 content: "commentaire",
//                 author: "Blandine",
//                 date: "25/05/1994"
//             },  
//             {
//                 content: "commentaire",
//                 author: "Blandine",
//                 date: "25/05/1994"
//             },  
//             {
//                 content: "commentaire",
//                 author: "Blandine",
//                 date: "25/05/1994"
//             }
//         ]
//     },
//     {
//         content: "je suis un message je suis un message e suis un message e suis un message e suis un message e suis un message je suis un message e suis un message e suis un message e suis un message e suis un message",
//         author: "Agnès",
//         date: "25/05/1904"
//     },
//     {
//         content: "je suis un message",
//         author: "François",
//         date: "25/05/2004"
//     },
//     {
//         content: "je suis un message",
//         author: "Pierre-Jean",
//         date: "25/05/2000"
//     }
// ];

const Home = ({ title, userId }) => {
    const dispatch = useDispatch();
    const messagesList = useSelector(selectMessagesList);
    const token = useSelector(selectToken);

    useEffect(() => {
        dispatch(fetchMessagesAsync({
            token,
            userId
        }))
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
            { title !== 'Accueil' && <Wall messages={messagesList}></Wall>}
            <aside className="aside-right">
                <h1>Messages privés</h1>
            </aside>
        </div>
    );
};

export default Home;