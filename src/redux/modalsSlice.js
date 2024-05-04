import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openLoginModal: false,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        toggleLoginModal(state) {
            state.openLoginModal = !state.openLoginModal;
        },
    },
});

export const { toggleLoginModal } = modalsSlice.actions;

export default modalsSlice.reducer;
