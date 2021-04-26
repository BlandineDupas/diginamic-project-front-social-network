import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  addUser,
  answerInvite,
  deleteInvite,
  inviteUser,
  logUser
} from 'reducers/login/loginAPI';

const initialState = {
  token: '',
  currentUser: {},
  registerResult: '',
  loginError: ''
};

export const addUserAsync = createAsyncThunk(
  'login/register',
  async (user) => {
    return await addUser(user);
  }
);

export const userLoginAsync = createAsyncThunk(
  'login/login',
  async (user) => await logUser(user)
);

export const answerInviteAsync = createAsyncThunk(
  'login/invite/answer',
  async (request) => {
    return await answerInvite(request);
  }
)

export const deleteInviteAsync = createAsyncThunk(
  'login/invite/delete',
  async (request) => {
    return await deleteInvite(request);
  }
)

export const inviteUserAsync = createAsyncThunk(
  'login/invite/add',
  async (request) => {
    return await inviteUser(request);
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAsync.fulfilled, (state, action) => {
        action.payload.error
          ? (state.registerResult = {success: false, error: action.payload.error})
          : (state.registerResult = {success: true, error: ''});
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        if (action.payload.error) state.loginError = action.payload.error;
        else {
          state.token = action.payload.token;
          state.currentUser = action.payload.user;
          state.loginError = '';
        }
      })
      .addCase(answerInviteAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(deleteInviteAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(inviteUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
  },
});

export const { logout } = loginSlice.actions;

export const selectToken = (state) => state.login.token;
export const selectCurrentUser = (state) => state.login.currentUser;
export const selectRegisterResult = (state) => state.login.registerResult;
export const selectLoginError = (state) => state.login.loginError;

export default loginSlice.reducer;
