import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// API
import {
    answerInvite,
    deleteInvite,
    inviteUser,
    searchUsers
} from "./friendsPageAPI";

const initialState = {
    search: '',
    searchResult: [],
    searchResultMessage: ''
};

export const searchUsersAsync = createAsyncThunk(
    'user/search',
    async (request) => {
        return await searchUsers(request);
    }
)

export const answerInviteAsync = createAsyncThunk(
    'invite/answer',
    async (request) => {
        return await answerInvite(request);
    }
)

export const deleteInviteAsync = createAsyncThunk(
    'invite/delete',
    async (request) => {
        return await deleteInvite(request);
    }
)

export const inviteUserAsync = createAsyncThunk(
    'user/invite',
    async (request) => {
        return await inviteUser(request);
    }
)


export const friendsPageSlice = createSlice({
    name: 'friendsPage',
    initialState,
    reducers: {
        changeInputValue: (state, action) => {
            state.search = action.payload;
            (action.payload.length === 0) && (state.searchResultMessage = '')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchUsersAsync.fulfilled, (state, action) => {
                if (action.payload.length === 0) {
                    state.searchResultMessage = 'La recherche n\'a donné aucun résultat';
                    state.searchResult = [];
                } else {
                    state.searchResultMessage = '';
                    state.searchResult = action.payload;
                }
            })
            .addCase(answerInviteAsync.fulfilled, (state, action) => {
                console.log(action.payload)
            })
            .addCase(deleteInviteAsync.fulfilled, (state, action) => {
                console.log(action.payload)
            })
            .addCase(inviteUserAsync.fulfilled, (state, action) => {
                console.log(action.payload)
            })

    }
});

export const {
    changeInputValue
} = friendsPageSlice.actions;

export const selectSearch = (state) => state.friendsPage.search;
export const selectSearchResult = (state) => state.friendsPage.searchResult;
export const selectSearchResultMessage = (state) => state.friendsPage.searchResultMessage;

export default friendsPageSlice.reducer;