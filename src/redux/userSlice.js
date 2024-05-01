// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    isAdmin: false,
    userId: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
        },
        makeAdmin: (state) => {
            state.isAdmin = true;
        },
        removeAdmin: (state) => {
            state.isAdmin = false;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    },
});

export const { login, logout, makeAdmin, removeAdmin, setUserId } = userSlice.actions;

export default userSlice.reducer;
