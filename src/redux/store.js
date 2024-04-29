// store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Asumiendo que tienes un slice para el usuario

const store = configureStore({
    reducer: {
        user: userReducer, // Agrega tus reducers aquí
        // Otros reducers pueden ir aquí
    },
});

export { store };
