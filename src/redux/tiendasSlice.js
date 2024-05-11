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
        tiendaInfo: null,
        displaySearch: false,
        resultadosSearch: [],
    },
    reducers: {
        setTiendas(state, action) {
            state.tiendas = action.payload;
            state.tiendaInfo = null;
            state.displaySearch = false;
        },
        toggleTodasLasTiendas(state) {
            state.todasLasTiendas = !state.todasLasTiendas;
        },
        setTiendaInfo(state, action) {
            state.displaySearch = false;
            state.tiendaInfo = action.payload;
        },
        addItemToTienda(state, action) {
            state.tiendaInfo.items.push(action.payload);
        },
        removeItemFromTienda(state, action) {
            // Filtrar la lista de items para eliminar el item con el id proporcionado
            state.tiendaInfo.items = state.tiendaInfo.items.filter((item) => item.id !== action.payload);
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
        setResultados(state, action) {
            state.tiendaInfo = null;
            state.resultadosSearch = action.payload;
            state.displaySearch = true;
        },
        mostrarResultados(state) {
            state.tiendaInfo = null;
            state.displaySearch = true;
        },
        ocultarResultados(state) {
            state.displaySearch = false;
        },
    },
});

export const {
    actualizarTienda,
    setTiendas,
    toggleTodasLasTiendas,
    setTiendaInfo,
    addItemToTienda,
    removeItemFromTienda,
    eliminarTienda,
    setResultados,
    mostrarResultados,
    ocultarResultados,
} = tiendasSlice.actions;

export default tiendasSlice.reducer;
