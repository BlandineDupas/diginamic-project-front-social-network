import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// registerAPI
import { addUser } from "./registerAPI";

const initialState = {
    lastname: {
        value: '',
        error: false,
        errorMessage: 'Le nom doit faire au moins 3 caractères'
    },
    firstname: {
        value: '',
        error: false,
        errorMessage: 'Le prénom doit faire au moins 3 caractères'
    },
    email: {
        value: '',
        error: false,
        errorMessage: 'L\'adresse mail doit faire au moins 4 caractères et correspondre au format d\'adresse email'
    },
    password: {
        value: '',
        error: false,
        errorMessage: 'Le mot de passe doit faire au moins 4 caractères'
    },
    passwordCheck: {
        value: '',
        error: false,
        errorMessage: 'Les mots de passe doivent être identiques'
    }
}

export const addUserAsync = createAsyncThunk(
    "user/add",
    async (user) => {
      return await addUser(user);
    }
);

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        changeInputValue: (state, action) => {
            return {
                ...state,
                [action.payload.inputName]: {
                    ...state[action.payload.inputName],
                    value: action.payload.inputValue
                }
            }
        },
        setError: (state, action) => {
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    error: true,
                }
            }
        },
        clearError: (state, action) => {
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    error: false,
                }
            }
        },
        clearForm: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(addUserAsync.fulfilled, (state, action) => {
            // state.value = action.payload;
          });
    },
});

export const {
    changeInputValue,
    setError,
    clearError,
    clearForm
} = registerSlice.actions;

export const selectLastname = (state) => state.register.lastname; 
export const selectFirstname = (state) => state.register.firstname; 
export const selectEmail = (state) => state.register.email; 
export const selectPassword = (state) => state.register.password; 
export const selectPasswordCheck = (state) => state.register.passwordCheck; 

export default registerSlice.reducer;