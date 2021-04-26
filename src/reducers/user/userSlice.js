import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  fetchUser
} from 'reducers/user/userAPI';

const initialState = {
  user: {}
};

export const fetchUserAsync = createAsyncThunk(
  'user/fetch',
  async (request) => {
    return await fetchUser(request);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  },
});

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
