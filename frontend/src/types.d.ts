export interface Message {
  id: string;
  author: string;
  message: string;
  datetime: string;
}

export type MessageBody = Omit<Message, 'id' | 'datetime'>;
