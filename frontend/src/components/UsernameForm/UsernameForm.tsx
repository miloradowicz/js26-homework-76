import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUsername, setUsername } from '@/store/slices/chatSlice';

interface Props {
  onClose: () => void;
}

const UsernameForm: FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const currentData = useAppSelector(selectUsername);
  const [data, setData] = useState(currentData);

  const validate = (data: string) => {
    if (!data?.trim() || data === currentData) {
      return false;
    }

    return true;
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setData(e.target.value);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (validate(data)) {
      dispatch(setUsername(data));
      onClose();
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        px: 4,
        pt: 3,
        pb: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <Typography variant='h5' gutterBottom>
            Hello
          </Typography>
          <Stack>
            <TextField label='Username' value={data} onChange={handleChange} />
          </Stack>
          <Stack direction='row' justifyContent='flex-end' gap={1}>
            <Button type='submit' color='success' disabled={!validate(data)}>
              Save
            </Button>
            <Button type='button' color='error' onClick={onClose}>
              Close
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default UsernameForm;
