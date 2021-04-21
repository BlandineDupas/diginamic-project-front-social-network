import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "./homeAPI";

const initialState = {
    messagesList: []
};

export const fetchMessagesAsync = createAsyncThunk(
    'messages/fetch',
    async (request) => {
        return await fetchMessages(request);
    }
)
export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessagesAsync.fulfilled, (state, action) => {
                state.messagesList = action.payload;
            })
    }
})

export const selectMessagesList = (state) => state.home.messagesList;

export default homeSlice.reducer;