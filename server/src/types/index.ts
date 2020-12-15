import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

export interface Error {
  status?: number;
  message?: string;
}

export interface EmojiOfThread {
  id: number;
  userList: number[];
}

export interface Thread {
  [key: string]: any;
  id: number;
  userId: number;
  channelId: number;
  parentId: number | null;
  content: string;
  url: string;
  isEdited: number;
  isPinned: number;
  isDeleted: number;
  createdAt: string;
  emoji: EmojiOfThread[];
  subCount: number;
  subThreadUserId1: number | null;
  subThreadUserId2: number | null;
  subThreadUserId3: number | null;
  email: string;
  displayName: string;
  phoneNumber: string | null;
  image: string;
}

export interface User {
  id: number;
  pw: string;
  email: string;
  displayName: string;
  phoneNumber: string | null;
  image: string;
  lastChannelId: number | null;
}

export type AuthToken = 'ACCESS' | 'REFRESH';

export type PoolReturnType = Promise<
  [RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]]
>;

export interface Model {
  [key: string]: (param?: any) => any;
}
