import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

// Component
import Input from 'components/parts/input/Input';

// Styles
import './commentForm.scss';

// Reducer
import {
    selectToken,
    selectCurrentUser
} from 'reducers/login/loginSlice';
import { sendCommentAsync } from 'reducers/post/postSlice';

const CommentForm = ({ postId }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const token = useSelector(selectToken);
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
      content.length > 0 && setError('');
    }, [content])
  
    const sendComment = (evt) => {
        evt.preventDefault();
        setContent(content.trim());
        !content && setError('Vous ne pouvez pas envoyer un message vide')
        content && dispatch(sendCommentAsync({
              token,
              commentData : {
                  content,
                  authorId: currentUser.id,
                  postId
              }
          }))
      
    }

    return (
        <form onSubmit={sendComment} className="commentForm">
            <legend>Commenter...</legend>
            <Input
                inputName="comment"
                inputType="textarea"
                inputData={content}
                changeInputValue={setContent}
                error={error}
            ></Input>
            <button type="submit">Envoyer</button>
        </form>
    )
}

export default CommentForm;
