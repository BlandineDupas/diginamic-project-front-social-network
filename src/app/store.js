import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '../components/main/register/registerSlice';
import loginReducer from '../reducers/user/userSlice';
import postFormReducer from '../features/postForm/postFormSlice';
import homeReducer from '../features/home/homeSlice';
import commentFormReducer from '../features/commentForm/commentFormSlice';
import friendsPageReducer from '../components/main/friendsPage/friendsPageSlice';

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
