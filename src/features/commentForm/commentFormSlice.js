import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendComment } from "./commentFormAPI";

const initialState = {
    comments: [],
    sended: false,
    sendedComments: []
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
            state.comments.[action.payload.messageId] = action.payload.inputValue;
        },
        clearSendedComments: (state) => {
            state.sended = false;
            state.sendedComments = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendCommentAsync.fulfilled, (state, action) => {
                state.comments[action.payload.MESSAGEId] = '';
                state.sended = true;
                state.sendedComments = [
                    ...state.sendedComments,
                    action.payload
                ];
            })
    }
});

export const {
    changeInputValue,
    clearSendedComments
} = commentFormSlice.actions;

export const selectComments = (state) => state.commentForm.comments;
export const selectSended = (state) => state.commentForm.sended;
export const selectSendedComments = (state) => state.commentForm.sendedComments;

export default commentFormSlice.reducer;