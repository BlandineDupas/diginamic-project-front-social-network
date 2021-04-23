import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { answerInvite, deleteInvite, inviteUser, logUser } from "./loginAPI";

const initialState = {
    email: '',
    password: '',
    error: false,
    token: false,
    user: {},
};

export const userLoginAsync = createAsyncThunk(
    'user/login',
    async (user) => await logUser(user)
);

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

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeInputValue: (state, action) => {
            state[action.payload.inputName] = action.payload.inputValue;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearForm: (state) => {
            return {
                ...state,
                email: '',
                password: '',
                error: false            
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLoginAsync.fulfilled, (state, action) => {
                if (action.payload.error) state.error = action.payload.error;
                else {
                    state.token = action.payload.token;
                    state.user = action.payload.user;
                }
            })
            .addCase(answerInviteAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                state.user = action.payload;
            })
            .addCase(deleteInviteAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                state.user = action.payload;
            })
            .addCase(inviteUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
                console.log(action.payload)
            })
    },
});

export const {
    changeInputValue,
    setError,
    clearForm
} = loginSlice.actions;

export const selectEmail = (state) => state.login.email;
export const selectPassword = (state) => state.login.password;
export const selectToken = (state) => state.login.token;
export const selectUser = (state) => state.login.user;
export const selectError = (state) => state.login.error;

export default loginSlice.reducer;