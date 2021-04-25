import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// Cmponents
import Page from 'components/parts/page/Page';
import Wall from 'components/parts/wall/Wall';
import PostForm from 'features/postForm/PostForm';
import UsersList from 'components/parts/usersList/UsersList';

// Reducer
import {
  answerInviteAsync,
  selectToken,
  selectUser
} from 'reducers/user/userSlice';
import {
  fetchPostsAsync,
  selectPostsList
} from 'reducers/post/postSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const postsList = useSelector(selectPostsList);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const answerInvite = (proposerId, status) => {
    dispatch(answerInviteAsync({
      token,
      answer: {
        status,
        proposerId,
      },
      userId: user.id
    }));
  }

  useEffect(() => {
    const friendsIdArray = [];
    user.friends.forEach((friend) => friendsIdArray.push(friend.id));
    dispatch(fetchPostsAsync({
      token,
      authorArray: friendsIdArray
    }));
  }, []);

  return (
    <Page title="Accueil">
        <div className="home">
          <PostForm></PostForm>
          <aside className="aside-left">
            <UsersList
              title="Invitations reçues"
              type="received_invites"
              action={answerInvite}
              users={user.received_invites.filter((invite) => invite.RECEIVED_INVITE.status === 'waiting')}
              emptyMessage="Vous n'avez pas reçu d'invitation"                      
            ></UsersList>
            <UsersList
              title="Mes amis"
              type="user"
              users={user.friends}
              emptyMessage="Vous n'avez pas encore d'ami"                      
            ></UsersList>
          </aside>
          <Wall posts={postsList}>
          </Wall>
          <aside className="aside-right">
            <h1>Messages privés</h1>
          </aside>
        </div>
    </Page>
  );
};

HomePage.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default HomePage;
