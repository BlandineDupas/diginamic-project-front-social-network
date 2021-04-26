import { configureStore } from '@reduxjs/toolkit';
import loginReducer from 'reducers/login/loginSlice';
import postReducer from 'reducers/post/postSlice';
import userReducer from 'reducers/user/userSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    post: postReducer,
    user: userReducer
  },
});
