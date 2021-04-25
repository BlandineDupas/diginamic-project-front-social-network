import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  fetchPosts,
  sendPost
} from './postAPI';

const initialState = {
  postsList: []
};

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetch',
  async (request) => {
    return await fetchPosts(request);
  }
)

export const sendPostAsync = createAsyncThunk(
  'post/send',
  async (request) => {
    return await sendPost(request);
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        action.payload ? (state.postsList = action.payload) : state.postsList = [];
      })
      .addCase(sendPostAsync.fulfilled, (state, action) => {
        state.postsList = [
          action.payload,
          ...state.postsList,
        ]
      })
  }
});

export const selectPostsList = (state) => state.post.postsList;

export default postSlice.reducer;
