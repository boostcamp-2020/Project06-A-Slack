export interface Error {
  status?: number;
  message?: string;
}

export type AuthToken = 'ACCESS' | 'REFRESH';
