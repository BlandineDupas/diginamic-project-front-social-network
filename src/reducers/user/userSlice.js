import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  addUser,
  answerInvite,
  deleteInvite,
  inviteUser,
  logUser
} from 'reducers/user/userAPI';

const initialState = {
  token: false,
  user: {},
  registerResult: ''
};

export const addUserAsync = createAsyncThunk(
  "user/add",
  async (user) => {
    return await addUser(user);
  }
);

export const userLoginAsync = createAsyncThunk(
  'user/login',
  async (user) => await logUser(user)
);

export const answerInviteAsync = createAsyncThunk(
  'invite/answer',
  async (request) => {
    return await answerInvite(request);
  }
)

export const deleteInviteAsync = createAsyncThunk(
  'invite/delete',
  async (request) => {
    return await deleteInvite(request);
  }
)

export const inviteUserAsync = createAsyncThunk(
  'user/invite',
  async (request) => {
    return await inviteUser(request);
  }
)

export const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAsync.fulfilled, (state, action) => {
        action.payload.error
          ? (state.registerResult = {success: false, error: action.payload.error})
          : (state.registerResult = {success: true, error: ''});
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        if (action.payload.error) state.error = action.payload.error;
        else {
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      })
      .addCase(answerInviteAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.user = action.payload;
      })
      .addCase(deleteInviteAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.user = action.payload;
      })
      .addCase(inviteUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log(action.payload)
      })
  },
});

export const selectToken = (state) => state.user.token;
export const selectUser = (state) => state.user.user;
export const selectRegisterResult = (state) => state.user.registerResult;

export default userSlice.reducer;
