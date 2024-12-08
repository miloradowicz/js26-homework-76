import { Message } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pollMessages, sendMessage } from '../thunks/chat';

interface State {
  username: string;
  messages: Message[];
  lastUpdated: number;
  error?: {
    message: string;
  };
}

const initialState: State = {
  username: '',
  messages: [],
  lastUpdated: 0,
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.error = undefined;

      if (!payload) {
        state.error = { message: 'Invalid username.' };
      } else {
        state.username = payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pollMessages.pending, (state) => {
        state.error = undefined;
      })
      .addCase(pollMessages.fulfilled, (state, { payload }) => {
        state.messages = payload;

        state.lastUpdated = Math.max(
          ...state.messages.map((x) => Date.parse(x.datetime))
        );
      })
      .addCase(pollMessages.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.error = { message: error.message };
        }
      })
      .addCase(sendMessage.pending, (state) => {
        state.error = undefined;
      })
      .addCase(sendMessage.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.error = { message: error.message };
        }
      });
  },
});

export const chatReducer = slice.reducer;

export const { setUsername } = slice.actions;
