import { FC, memo } from 'react';
import dayjs from 'dayjs';

import { Stack, Typography } from '@mui/material';

import { Message } from '@/types.d';
import { useAppSelector } from '@/app/hooks';
import { selectUsername } from '@/store/slices/chatSlice';

interface Props {
  message: Message;
}

const formatDatetime = (datetime: string) => {
  const date = dayjs(datetime);
  const today = dayjs();

  return date.startOf('day').valueOf() === today.startOf('day').valueOf()
    ? 'Today'
    : date.startOf('day').add(1, 'day').valueOf() ===
      today.startOf('day').valueOf()
    ? 'Yesterday'
    : date.startOf('year').valueOf() === today.startOf('year').valueOf()
    ? date.format('DD MMMM')
    : date.format('DD MMMM YYYY');
};

const MessageItem: FC<Props> = memo(
  ({ message: { message, author, datetime } }) => {
    const username = useAppSelector(selectUsername);

    return (
      <Stack>
        <Stack
          alignSelf='stretch'
          justifyContent='space-between'
          direction={author !== username ? 'row' : 'row-reverse'}
        >
          <Typography>{author}</Typography>
          <Typography color='text.secondary'>
            {formatDatetime(datetime)}
          </Typography>
        </Stack>

        <Typography
          alignSelf={author !== username ? 'flex-start' : 'flex-end'}
          sx={{
            borderRadius: 2,
            bgcolor: author !== username ? 'text.disabled' : 'warning.main',
            p: 1,
          }}
        >
          {message}
        </Typography>
      </Stack>
    );
  },
  (prev, next) => prev.message.id === next.message.id
);

export default MessageItem;
