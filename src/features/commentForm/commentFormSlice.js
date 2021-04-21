import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendComment } from "./commentFormAPI";

const initialState = {
    comment: '',
    error: false,
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
            state[action.payload.inputName] = action.payload.inputValue;
            action.payload.inputName.length > 0 && (state.error = false);
        },
        setErrorTrue: (state) => {
            state.error = true;
        },
        clearSendedComments: (state) => {
            state.sended = false;
            state.sendedComments = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendCommentAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                return {
                    comment: '',
                    error: false,
                    sended: true,
                    sendedComments: [
                        ...state.sendedComments,
                        action.payload
                    ]
                }
            })
    }
});

export const {
    changeInputValue,
    setErrorTrue,
    clearSendedComments
} = commentFormSlice.actions;

export const selectComment = (state) => state.commentForm.comment;
export const selectError = (state) => state.commentForm.error;
export const selectSended = (state) => state.commentForm.sended;
export const selectSendedComments = (state) => state.commentForm.sendedComments;

export default commentFormSlice.reducer;