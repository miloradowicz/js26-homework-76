import { Message } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadMessages, sendMessage } from '../thunks/chatThunk';
import { RootState } from '@/app/store';

interface State {
  username: string;
  messages: Message[];
  lastUpdated?: number;
  lastError?: {
    message: string;
  };
}

const initialState: State = {
  username: 'miloradowicz',
  messages: [],
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.lastError = undefined;

      if (!payload) {
        state.lastError = { message: 'Invalid username.' };
      } else {
        state.username = payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMessages.pending, (state) => {
        state.lastError = undefined;
      })
      .addCase(loadMessages.fulfilled, (state, { payload }) => {
        state.messages.push(...payload);

        state.lastUpdated = Math.max(
          ...state.messages.map((x) => Date.parse(x.datetime))
        );
      })
      .addCase(loadMessages.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
      })
      .addCase(sendMessage.pending, (state) => {
        state.lastError = undefined;
      })
      .addCase(sendMessage.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
      });
  },
});

export const chatReducer = slice.reducer;

export const { setUsername } = slice.actions;

export const selectUsername = (state: RootState) => state.chatReducer.username;
export const selectMessages = (state: RootState) => state.chatReducer.messages;
export const selectLastError = (state: RootState) =>
  state.chatReducer.lastError;
