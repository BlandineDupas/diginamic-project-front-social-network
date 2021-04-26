import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Page from 'components/parts/page/Page';
import Wall from 'components/parts/wall/Wall';

// Reducers
import {
  fetchPostsAsync,
  selectPostsList
} from 'reducers/post/postSlice';
import {
  selectToken,
  selectCurrentUser
} from 'reducers/login/loginSlice';
import { useEffect } from 'react';
import PostForm from 'components/parts/postForm/PostForm';
import { fetchUserAsync, selectUser } from 'reducers/user/userSlice';

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

  return (
    <Page title={ user.firstname + ' ' + user.lastname }>
      { (userId === currentUser.id) && <PostForm></PostForm>}
      <Wall posts={postsList}>
      </Wall>
    </Page>
  );
};

UserPage.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default UserPage;
