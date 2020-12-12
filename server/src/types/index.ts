import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

export interface Error {
  status?: number;
  message?: string;
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
