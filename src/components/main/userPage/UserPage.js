import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Page from 'components/parts/page/Page';
import Wall from 'components/parts/wall/Wall';

// Styles
import './userPage.scss';

// Reducers
import {
  fetchPostsAsync,
  selectPostsList
} from 'reducers/post/postSlice';
import {
  selectToken,
  selectCurrentUser,
  inviteUserAsync,
  deleteInviteAsync,
  answerInviteAsync
} from 'reducers/login/loginSlice';
import { useEffect } from 'react';
import PostForm from 'components/parts/postForm/PostForm';
import { fetchUserAsync, selectUser } from 'reducers/user/userSlice';
import { getUsersIdArray } from 'selectors';
import Button from 'components/parts/button/Button';

const UserPage = ({ userId }) => {
  const dispatch = useDispatch();
  const postsList = useSelector(selectPostsList);
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const userData = useSelector(selectUser);

  let user;
  if (userId === currentUser.id) {
    user = currentUser;
  } else {
    user = userData;
  }

  useEffect(() => {
    dispatch(fetchUserAsync({
      token,
      userId
    }));
    dispatch(fetchPostsAsync({
      token,
      authorArray: [ userId ]
    }));
  }, []);

  const isFriend = (
    userId !== currentUser.id
    && getUsersIdArray(currentUser.proposed_invites).includes(userId)
  )

  const isInvited = (
    userId !== currentUser.id
    && getUsersIdArray(currentUser.proposed_invites).includes(userId)
    && !getUsersIdArray(currentUser.friends).includes(userId)
  )

  const hasInvited = (
    userId !== currentUser.id
    && getUsersIdArray(currentUser.received_invites).includes(userId)
    && !getUsersIdArray(currentUser.friends).includes(userId)
  )

  const isUnknown = (
    userId !== currentUser.id
    && !getUsersIdArray(currentUser.proposed_invites).includes(userId)
    && !getUsersIdArray(currentUser.received_invites).includes(userId)
    && !getUsersIdArray(currentUser.friends).includes(userId)
  )

  const answerInvite = (proposerId, status) => {
    dispatch(answerInviteAsync({
      token,
      answer: {
        status,
        proposerId
      },
      userId: currentUser.id
    }));
  }

  const deleteInvite = (receiverId) => {
    dispatch(deleteInviteAsync({
      token,
      receiverId,
      userId: currentUser.id
    }));
  }

  const inviteUser = (receiverId) => {
    dispatch(inviteUserAsync({
      token,
      receiverId,
      userId: currentUser.id
    }));
  }
  return (
    <Page title={ user.firstname + ' ' + user.lastname } extraClass="userPage">
      { (userId === currentUser.id) && <PostForm></PostForm>}

      <div className="invite_buttons">
        { isUnknown && <Button
          color="green"
          label="Inviter à devenir ami"
          userId={user.id}
          action={inviteUser}
        ></Button> }

        { hasInvited && 
          <>
            <Button
              color="green"
              label="Accepter l'invitation"
              action={answerInvite}
              userId={user.id}
              actionParam="accepted"
            ></Button>
            <Button
              color="red"
              label="Refuser l'invitation"
              action={answerInvite}
              userId={user.id}
              actionParam="denied"
            ></Button>
          </>
          }

        { isInvited && <Button
          color="red"
          label="Supprimer l'invitation"
          action={deleteInvite}
          userId={user.id}
        ></Button> }
      </div>
      <Wall posts={postsList}>
      </Wall>
    </Page>
  );
};

UserPage.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default UserPage;
