import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./postFormAPI";

const initialState = {
    message: '',
    error: false
};

export const sendMessageAsync = createAsyncThunk(
    "message/send",
    async (message) => {
      return await sendMessage(message);
    }
)

export const postFormSlice = createSlice({
    name: 'postForm',
    initialState,
    reducers: {
        changeInputValue: (state, action) => {
            state[action.payload.inputName] = action.payload.inputValue;
        },
        setErrorTrue: (state) => {
            state.error = true;
        }
    }
});

export const {
    changeInputValue,
    setErrorTrue
} = postFormSlice.actions;

export const selectMessage = (state) => state.postForm.message;
export const selectError = (state) => state.postForm.error;

export default postFormSlice.reducer;