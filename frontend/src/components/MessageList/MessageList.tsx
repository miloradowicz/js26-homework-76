import { useEffect, useRef } from 'react';

import { useAppSelector } from '@/app/hooks';
import { selectMessages } from '@/store/slices/chatSlice';

import MessageItem from './MessageItem/MessageItem';

const MessageList = () => {
  const messages = useAppSelector(selectMessages);

  const dummy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dummy.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      {messages.map((x) => (
        <MessageItem key={x.id} message={x} />
      ))}
      <div ref={dummy} />
    </>
  );
};

export default MessageList;
