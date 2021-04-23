import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'reducers/user/userSlice';
import postFormReducer from '../features/postForm/postFormSlice';
import homeReducer from '../features/home/homeSlice';
import commentFormReducer from '../features/commentForm/commentFormSlice';
import friendsPageReducer from '../components/main/friendsPage/friendsPageSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    postForm: postFormReducer,
    home: homeReducer,
    commentForm: commentFormReducer,
    friendsPage: friendsPageReducer
  },
});
