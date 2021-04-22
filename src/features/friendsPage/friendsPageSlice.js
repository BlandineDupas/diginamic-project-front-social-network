import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchUsers } from "./friendsPageAPI";

const initialState = {
    search: '',
    searchResult: []
};

export const searchUsersAsync = createAsyncThunk(
    'user/search',
    async (request) => {
        return await searchUsers(request);
    }
)

export const friendsPageSlice = createSlice({
    name: 'friendsPage',
    initialState,
    reducers: {
        changeInputValue: (state, action) => {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchUsersAsync.fulfilled, (state, action) => {
            console.log(action.payload)
            state.searchResult = action.payload;
        })
    }
});

export const {
    changeInputValue
} = friendsPageSlice.actions;

export const selectSearch = (state) => state.friendsPage.search;
export const selectSearchResult = (state) => state.friendsPage.searchResult;

export default friendsPageSlice.reducer;