// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    isAdmin: false
    // Otros estados de usuario pueden ir aquí
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
            state.isAdmin = true
        },
        removeAdmin: (state) => {
            state.isAdmin = false
        }
    },
});

export const { login, logout, makeAdmin, removeAdmin } = userSlice.actions;

export default userSlice.reducer;
