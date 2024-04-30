import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tiendasReducer from './tiendasSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        tiendas: tiendasReducer,
    },
});

export { store };
