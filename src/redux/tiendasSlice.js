import { createSlice } from '@reduxjs/toolkit';
import { getFetch } from '../../api';

// Acción asincrónica para obtener los datos de las tiendas
export const fetchTiendas = async () => {
    const tiendasData = await getFetch('stores');
    return tiendasData;
};

const tiendasSlice = createSlice({
    name: 'tiendas',
    initialState: {
        tiendas: false,
        todasLasTiendas: true,
    },
    reducers: {
        setTiendas(state, action) {
            state.tiendas = action.payload;
        },
        toggleTodasLasTiendas(state) {
            state.todasLasTiendas = !state.todasLasTiendas;
        },
        actualizarTienda(state, action) {
            const { id, nuevosDatos } = action.payload;
            const tiendaIndex = state.tiendas.findIndex((tienda) => tienda.id === id);
            if (tiendaIndex !== -1) {
                state.tiendas[tiendaIndex] = { ...state.tiendas[tiendaIndex], ...nuevosDatos };
            }
        },
        eliminarTienda(state, action) {
            const { id } = action.payload;
            const tiendaIndex = state.tiendas.findIndex((tienda) => tienda.id === id);
            if (tiendaIndex !== -1) {
                state.tiendas.splice(tiendaIndex, 1);
            }
        },
    },
});

export const { actualizarTienda, setTiendas, toggleTodasLasTiendas, eliminarTienda } = tiendasSlice.actions;

export default tiendasSlice.reducer;
