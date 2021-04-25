import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'reducers/user/userSlice';
import postReducer from 'reducers/post/postSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});
