import { useDispatch, useSelector } from "react-redux";

// Component
import Input from "./Input";

// Reducer
import {
    changeInputValue,
    setErrorTrue,
    selectMessage,
    selectError,
    sendMessageAsync
} from "./postFormSlice";
import { selectToken, selectCurrentUser } from "../../reducers/user/userSlice";

const PostForm = () => {
    const dispatch = useDispatch();
    const message = useSelector(selectMessage);
    const currentUser = useSelector(selectCurrentUser);
    const error = useSelector(selectError)
    const token = useSelector(selectToken);

    const sendMessage = (evt) => {
        evt.preventDefault();
        message
            ? dispatch(sendMessageAsync({
                token,
                messageData : {
                    content: message,
                    authorId: currentUser.id
                }
            }))
            : dispatch(setErrorTrue())     
    }

    return (
        <form onSubmit={sendMessage}>
            <legend>Partager quelque chose...</legend>
            <Input
                inputName="message"
                inputType="textarea"
                inputData={message}
                changeInputValue={changeInputValue}
            ></Input>
            { error && <p>Vous ne pouvez pas envoyer un message vide</p>}
            <button type="submit">Envoyer</button>
        </form>
    )
}

export default PostForm;
