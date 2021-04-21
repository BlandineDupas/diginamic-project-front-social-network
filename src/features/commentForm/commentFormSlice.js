import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendComment } from "./commentFormAPI";

const initialState = {
    comment: '',
    error: false
};

export const sendCommentAsync = createAsyncThunk(
    "comment/send",
    async (request) => {
      return await sendComment(request);
    }
)

export const commentFormSlice = createSlice({
    name: 'commentForm',
    initialState,
    reducers: {
        changeInputValue: (state, action) => {
            state[action.payload.inputName] = action.payload.inputValue;
            action.payload.inputName.length > 0 && (state.error = false);
        },
        setErrorTrue: (state) => {
            state.error = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendCommentAsync.fulfilled, () => {
                return initialState;
            })
    }
});

export const {
    changeInputValue,
    setErrorTrue
} = commentFormSlice.actions;

export const selectComment = (state) => state.commentForm.comment;
export const selectError = (state) => state.commentForm.error;

export default commentFormSlice.reducer;