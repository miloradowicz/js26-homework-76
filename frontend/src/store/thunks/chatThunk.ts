import { api } from '@/api';
import { RootState } from '@/app/store';
import { Message } from '@/types';
import { createAsyncThunk, GetThunkAPI } from '@reduxjs/toolkit';

export const loadMessages = createAsyncThunk(
  'chat/loadMessages',
  async (datetime?: string) => {
    const params = {
      datetime,
    };

    if (datetime && !Number.isNaN(Date.parse(datetime))) {
      params.datetime = datetime;
    }

    const { data, status, statusText } = await api.get<Message[]>('messages', {
      params,
    });

    if (status !== 200) {
      throw new Error(statusText);
    }

    return data;
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message: string, thunkAPI: GetThunkAPI<{ state: RootState }>) => {
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

    if (status !== 200) {
      throw new Error(statusText);
    }

    return data;
  }
);
