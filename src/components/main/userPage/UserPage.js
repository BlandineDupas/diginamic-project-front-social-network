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
} from 'reducers/user/userSlice';
import { useEffect } from 'react';

const UserPage = ({ userId }) => {
  const dispatch = useDispatch();
  const postsList = useSelector(selectPostsList);
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);

  if (userId !== currentUser.id) {
    console.log('page d\'un utilisateur lambda')
  } else {
    console.log('page de l\'utilisateur connecté')
  }

  useEffect(() => {
    dispatch(fetchPostsAsync({
      token,
      authorArray: [ userId ]
    }));
  }, []);

  return (
    <Page title="prénom nom">
      <Wall posts={postsList}>
      </Wall>
    </Page>
  );
};

UserPage.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default UserPage;
