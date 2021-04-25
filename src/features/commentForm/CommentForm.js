import { useDispatch, useSelector } from "react-redux";

// Component
import Input from "./Input";

// Reducer
import {
    changeInputValue,
    selectComments,
    sendCommentAsync
} from "./commentFormSlice";
import {
    selectToken,
    selectCurrentUser
} from "../../reducers/user/userSlice";

const CommentForm = ({messageId}) => {
    const dispatch = useDispatch();
    const comments = useSelector(selectComments);
    const currentUser = useSelector(selectCurrentUser);
    const token = useSelector(selectToken);

    const sendComment = (evt) => {
        evt.preventDefault();
        comments[messageId] && comments[messageId].trim().length > 0
            && dispatch(sendCommentAsync({
                token,
                commentData : {
                    content: comments[messageId].trim(),
                    authorId: currentUser.id,
                    messageId
                }
            }))
    }

    return (
        <form onSubmit={sendComment}>
            <legend>Commenter...</legend>
            <Input
                inputName="comment"
                inputType="textarea"
                inputData={comments[messageId] && comments[messageId]}
                changeInputValue={changeInputValue}
                messageId={messageId}
            ></Input>
            <button type="submit">Envoyer</button>
        </form>
    )
}

export default CommentForm;
