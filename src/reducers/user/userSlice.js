import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  answerInvite,
  deleteInvite,
  inviteUser,
  logUser
} from 'reducers/user/userAPI';

const initialState = {
  token: false,
  user: {},
};

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

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // TODO supprimer clearform ?
    clearForm: (state) => {
      return {
        ...state,
        email: '',
        password: '',
        error: false            
      }
    }
  },
  extraReducers: (builder) => {
    builder
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

export const {
  clearForm
} = loginSlice.actions;

export const selectToken = (state) => state.login.token;
export const selectUser = (state) => state.login.user;

export default loginSlice.reducer;
