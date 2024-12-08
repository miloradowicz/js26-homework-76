import { api } from '@/api';
import { Message, MessageBody } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const pollMessages = createAsyncThunk(
  'chat/pollMessages',
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
  async (body: MessageBody) => {
    if (!body.message) {
      throw new Error('Invalid author.');
    }

    if (!body.message) {
      throw new Error('Invalid message.');
    }

    const { data, status, statusText } = await api.post<Message>(
      'messages',
      body
    );

    if (status !== 200) {
      throw new Error(statusText);
    }

    return data;
  }
);
