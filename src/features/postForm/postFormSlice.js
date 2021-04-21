import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./postFormAPI";

const initialState = {
    message: '',
    error: false,
    sended: false,
    sendedMessages: []
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
            action.payload.inputName.length > 0 && (state.error = false);
        },
        setErrorTrue: (state) => {
            state.error = true;
        },
        clearSendedMessages: (state) => {
            state.sended = false;
            state.sendedMessages = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessageAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                return {
                    message: '',
                    error: false,
                    sended: true,
                    sendedMessages: [
                        ...state.sendedMessages,
                        action.payload
                    ]
                }
            })
    }
});

export const {
    changeInputValue,
    setErrorTrue,
    clearSendedMessages
} = postFormSlice.actions;

export const selectMessage = (state) => state.postForm.message;
export const selectError = (state) => state.postForm.error;
export const selectSended = (state) => state.postForm.sended;
export const selectSendedMessages = (state) => state.postForm.sendedMessages;

export default postFormSlice.reducer;