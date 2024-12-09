import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import { Divider, IconButton, InputBase, Paper } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import { useAppDispatch } from '@/app/hooks';
import { sendMessage } from '@/store/thunks/chatThunk';

const validate = (data: string) => {
  if (!data?.trim()) {
    return false;
  }

  return true;
};

const MessageForm = () => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState('');

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setData(e.target.value);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (validate(data)) {
      await dispatch(sendMessage(data));
      setData('');
    }
  };

  return (
    <Paper
      component='form'
      variant='outlined'
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', flex: 1 }}
      onSubmit={handleSubmit}
    >
      <InputBase
        placeholder='Type your message...'
        sx={{ ml: 1, flex: 1 }}
        onChange={handleChange}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton
        type='submit'
        color='primary'
        sx={{ p: '10px' }}
        aria-label='send'
        disabled={!validate(data)}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default MessageForm;
