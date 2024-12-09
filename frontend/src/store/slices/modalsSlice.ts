import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

interface State {
  usernameModalOpen: boolean;
}

const initialState: State = { usernameModalOpen: false };

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openUsernameModal: (state) => {
      state.usernameModalOpen = true;
    },
    closeUsernameModal: (state) => {
      state.usernameModalOpen = false;
    },
  },
});

export const modalsReducer = slice.reducer;

export const { openUsernameModal, closeUsernameModal } = slice.actions;

export const selectUsernameModalOpen = (state: RootState) =>
  state.modalsReducer.usernameModalOpen;
