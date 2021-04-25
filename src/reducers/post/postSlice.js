import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  fetchPosts,
  sendComment,
  sendPost
} from './postAPI';

const initialState = {
  postsList: [],
  newComments: [],
};

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetch',
  async (request) => {
    return await fetchPosts(request);
  }
);

export const sendPostAsync = createAsyncThunk(
  'post/send',
  async (request) => {
    return await sendPost(request);
  }
);

export const sendCommentAsync = createAsyncThunk(
  "comment/send",
  async (request) => {
    return await sendComment(request);
  }
);

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
      .addCase(sendCommentAsync.fulfilled, (state, action) => {
        state.newComments = [
          ...state.newComments,
          action.payload
        ]
      })

  }
});

export const selectPostsList = (state) => state.post.postsList;
export const selectNewComments = (state) => state.post.newComments;

export default postSlice.reducer;
