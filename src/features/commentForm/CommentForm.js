import { useDispatch, useSelector } from "react-redux";

// Component
import Input from "./Input";

// Reducer
import {
    changeInputValue,
    setErrorTrue,
    selectComment,
    selectError,
    sendCommentAsync
} from "./commentFormSlice";
import { selectToken, selectUser } from "../login/loginSlice";

const CommentForm = ({messageId}) => {
    const dispatch = useDispatch();
    const comment = useSelector(selectComment);
    const user = useSelector(selectUser);
    const error = useSelector(selectError)
    const token = useSelector(selectToken);

    const sendComment = (evt) => {
        evt.preventDefault();
        comment
            ? dispatch(sendCommentAsync({
                token,
                commentData : {
                    content: comment,
                    authorId: user.id,
                    messageId
                }
            }))
            : dispatch(setErrorTrue())     
    }

    return (
        <form onSubmit={sendComment}>
            <legend>Commenter...</legend>
            <Input
                inputName="comment"
                inputType="textarea"
                inputData={comment}
                changeInputValue={changeInputValue}
            ></Input>
            { error && <p>Vous ne pouvez pas envoyer un message vide</p>}
            <button type="submit">Envoyer</button>
        </form>
    )
}

export default CommentForm;