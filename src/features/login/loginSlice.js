import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { logUser } from "./loginAPI";

const initialState = {
    email: '',
    password: '',
    token: false,
    user: {}
};

export const userLoginAsync = createAsyncThunk(
    'user/login',
    async (user) => await logUser(user)
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeInputValue: (state, action) => {
            state[action.payload.inputName] = action.payload.inputValue;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(userLoginAsync.fulfilled, (state, action) => {
            // console.log('state : ', state, 'action : ', action)
            // console.log('payload', action.payload)
            state.token = action.payload.token;
            state.user = action.payload.user
          });
    },
});

export const {
    changeInputValue,
} = loginSlice.actions;

export const selectEmail = (state) => state.login.email;
export const selectPassword = (state) => state.login.password;
export const selectToken = (state) => state.login.token;
export const selectUser = (state) => state.login.user;

export default loginSlice.reducer;