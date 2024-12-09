import { api } from '@/api';
import { RootState } from '@/app/store';
import { Message } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export const loadMessages = createAsyncThunk<
  Message[],
  void,
  { state: RootState }
>('chat/loadMessages', async (_, thunkAPI) => {
  const lastUpdated = thunkAPI.getState().chatReducer.lastUpdated;

  let params: { datetime: string } | undefined = undefined;

  if (lastUpdated && !Number.isNaN(lastUpdated)) {
    params = { datetime: dayjs(lastUpdated).toISOString() };
  }

  const { data, status, statusText } = await api.get<Message[]>('messages', {
    params,
  });

  if (status < 200 || status >= 400) {
    throw new Error(statusText);
  }

  return data;
});

export const sendMessage = createAsyncThunk<
  Message,
  string,
  { state: RootState }
>('chat/sendMessage', async (message, thunkAPI) => {
  const author = thunkAPI.getState().chatReducer.username;
  if (!author) {
    throw new Error('Invalid author.');
  }

  if (!message) {
    throw new Error('Invalid message.');
  }

  const { data, status, statusText } = await api.post<Message>('messages', {
    author,
    message,
  });

  if (status < 200 || status >= 400) {
    throw new Error(statusText);
  }

  return data;
});
