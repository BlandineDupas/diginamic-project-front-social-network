import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// Cmponents
import Page from 'components/parts/page/Page';
import Wall from 'components/parts/wall/Wall';
import PostForm from 'components/parts/postForm/PostForm';
import UsersList from 'components/parts/usersList/UsersList';

// Styles
import './homePage.scss';

// Reducer
import {
  answerInviteAsync,
  selectToken,
  selectCurrentUser
} from 'reducers/login/loginSlice';
import {
  fetchPostsAsync,
  selectPostsList
} from 'reducers/post/postSlice';

// Selectors
import { getUsersIdArray } from 'selectors';

const HomePage = () => {
  const dispatch = useDispatch();
  const postsList = useSelector(selectPostsList);
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);

  const answerInvite = (proposerId, status) => {
    dispatch(answerInviteAsync({
      token,
      answer: {
        status,
        proposerId,
      },
      userId: currentUser.id
    }));
  }

  useEffect(() => {
    const friendsIdArray = getUsersIdArray(currentUser.friends);
    dispatch(fetchPostsAsync({
      token,
      authorArray: friendsIdArray
    }));
  }, []);

  return (
    <Page title="Accueil" extraClass="homePage">
      <PostForm></PostForm>
      <aside className="aside-left">
        <UsersList
          title="Invitations reçues"
          type="received_invites"
          action={answerInvite}
          users={currentUser.received_invites.filter((invite) => invite.RECEIVED_INVITE.status === 'waiting')}
          emptyMessage="Vous n'avez pas reçu d'invitation"                      
        ></UsersList>
        <UsersList
          title="Mes amis"
          type="user"
          users={currentUser.friends}
          emptyMessage="Vous n'avez pas encore d'ami"                      
        ></UsersList>
      </aside>
      <Wall posts={postsList}>
      </Wall>
      {/* <aside className="aside-right">
        <h1>Messages privés</h1>
      </aside> */}
    </Page>
  );
};

export default HomePage;
