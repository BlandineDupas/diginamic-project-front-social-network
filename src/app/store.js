import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '../features/register/registerSlice';
import loginReducer from '../features/login/loginSlice';
import postFormReducer from '../features/postForm/postFormSlice';
import homeReducer from '../features/home/homeSlice';
import commentFormReducer from '../features/commentForm/commentFormSlice';
import friendsPageReducer from '../features/friendsPage/friendsPageSlice';

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    postForm: postFormReducer,
    home: homeReducer,
    commentForm: commentFormReducer,
    friendsPage: friendsPageReducer
  },
});
