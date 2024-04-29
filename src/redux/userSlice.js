// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    // Otros estados de usuario pueden ir aquí
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            return { ...state, loggedIn: true };
        },
        logout: (state) => {
            return { ...state, loggedIn: false };
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
