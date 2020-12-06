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
