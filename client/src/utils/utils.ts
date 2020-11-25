import jwt from 'jsonwebtoken';
import config from '@/config';
import { AuthToken } from '@/types';
import { TOKEN_TYPE } from '@/utils/constants';

export const verifyJWT = (token: string, type: AuthToken) => {
  return jwt.verify(token, type === TOKEN_TYPE.ACCESS ? config.jwtSecret : config.jwtRefreshSecret);
};
