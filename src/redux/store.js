import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tiendasReducer from './tiendasSlice';
import modalsReducer from './modalsSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        tiendas: tiendasReducer,
        modals: modalsReducer,
    },
});

export { store };
