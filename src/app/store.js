import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '../features/register/registerSlice';
import loginReducer from '../features/login/loginSlice';
import postFormReducer from '../features/postForm/postFormSlice';

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    postForm: postFormReducer
  },
});
