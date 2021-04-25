import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

// Component
import Input from 'components/parts/input/Input';

// Reducer
import {
    selectToken,
    selectCurrentUser
} from 'reducers/user/userSlice';
import { sendCommentAsync } from 'reducers/post/postSlice';

const CommentForm = ({ postId }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const token = useSelector(selectToken);
    // const comments = useSelector(selectComments);
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
      content.length > 0 && setError('');
    }, [content])
  
    const sendComment = (evt) => {
        evt.preventDefault();
        setContent(content.trim());
        !content && setError('Vous ne pouvez pas envoyer un message vide')
      // comments[messageId] && comments[messageId].trim().length > 0
        content && dispatch(sendCommentAsync({
              token,
              commentData : {
                  // content: comments[messageId].trim(),
                  content,
                  authorId: currentUser.id,
                  postId
              }
          }))
      
    }

    return (
        <form onSubmit={sendComment}>
            <legend>Commenter...</legend>
            <Input
                inputName="comment"
                inputType="textarea"
                inputData={content}
                changeInputValue={setContent}
                error={error}
                // messageId={messageId}
            ></Input>
            <button type="submit">Envoyer</button>
        </form>
    )
}

export default CommentForm;
