import { useCallback, useEffect } from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectLastError, selectUsername } from '@/store/slices/chatSlice';
import { loadMessages } from '@/store/thunks/chatThunk';
import { openUsernameModal } from '@/store/slices/modalsSlice';

import MessageList from '@/components/MessageList/MessageList';
import MessageForm from '@/components/MessageForm/MessageForm';
import { useSnackbar } from 'notistack';

const defaults = {
  updateInterval: 3000,
};

const Chat = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const username = useAppSelector(selectUsername);
  const lastError = useAppSelector(selectLastError);

  const pollMessages = useCallback(async () => {
    await dispatch(loadMessages());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(pollMessages, defaults.updateInterval);

    return () => clearInterval(interval);
  }, [pollMessages]);

  useEffect(() => {
    if (lastError) {
      closeSnackbar();
      enqueueSnackbar(lastError.message, { variant: 'error' });
    }
  }, [lastError, enqueueSnackbar, closeSnackbar]);

  const handleOpen = () => {
    dispatch(openUsernameModal());
  };

  return (
    <Card sx={{ my: 2 }}>
      <CardHeader
        title={username}
        action={
          <Button type='button' onClick={handleOpen}>
            Change username
          </Button>
        }
      />
      <CardContent sx={{ overflow: 'auto', height: '80dvh' }}>
        <MessageList />
      </CardContent>
      <CardActions>
        <MessageForm />
      </CardActions>
    </Card>
  );
};

export default Chat;
