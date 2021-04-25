import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'reducers/user/userSlice';
import postReducer from 'reducers/post/postSlice';
import homeReducer from '../features/home/homeSlice';
import commentFormReducer from '../features/commentForm/commentFormSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    home: homeReducer,
    commentForm: commentFormReducer,
  },
});
