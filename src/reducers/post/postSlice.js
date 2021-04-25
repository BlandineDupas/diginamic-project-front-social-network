import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './postAPI';

const initialState = {
  postsList: []
};

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetch',
  async (request) => {
    return await fetchPosts(request);
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
  }
});

export const selectPostsList = (state) => state.post.postsList;

export default postSlice.reducer;
