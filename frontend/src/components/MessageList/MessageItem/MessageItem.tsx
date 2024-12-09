import { FC, memo } from 'react';
import dayjs from 'dayjs';

import { Stack, Typography } from '@mui/material';

import { Message } from '@/types.d';
import { useAppSelector } from '@/app/hooks';
import { selectUsername } from '@/store/slices/chatSlice';

interface Props {
  message: Message;
}

const MessageItem: FC<Props> = memo(
  ({ message: { message, author, datetime } }) => {
    const username = useAppSelector(selectUsername);

    return (
      <Stack>
        <Stack
          alignSelf='stretch'
          direction={author !== username ? 'row' : 'row-reverse'}
        >
          <Typography>{author}</Typography>
          <Typography className='text-muted'>
            {dayjs(datetime).format('DD/MM/YYYY')}
          </Typography>
        </Stack>

        <Typography alignSelf={author !== username ? 'flex-start' : 'flex-end'}>
          {message}
        </Typography>
      </Stack>
    );
  },
  (prev, next) => prev.message.id === next.message.id
);

export default MessageItem;
