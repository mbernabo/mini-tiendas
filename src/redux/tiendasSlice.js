import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFetch } from '../../api';

// Acción asincrónica para obtener los datos de las tiendas
export const fetchTiendas = createAsyncThunk('tiendas/fetchTiendas', async () => {
    const tiendasData = await getFetch('stores');
    return tiendasData;
});

const tiendasSlice = createSlice({
    name: 'tiendas',
    initialState: {
        tiendas: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        actualizarTienda(state, action) {
            const { id, nuevosDatos } = action.payload;
            const tiendaIndex = state.tiendas.findIndex((tienda) => tienda.id === id);
            if (tiendaIndex !== -1) {
                state.tiendas[tiendaIndex] = { ...state.tiendas[tiendaIndex], ...nuevosDatos };
            }
        },
        // Otras acciones para agregar, eliminar tiendas, etc.
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTiendas.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTiendas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tiendas = action.payload;
            })
            .addCase(fetchTiendas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { actualizarTienda } = tiendasSlice.actions;

export default tiendasSlice.reducer;
