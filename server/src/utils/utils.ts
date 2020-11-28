import jwt from 'jsonwebtoken';
import config from '@/config';
import { AuthToken } from '@/types';
import { TOKEN_TYPE } from '@/utils/constants';

export const verifyRequestData = (arr: any[]): boolean =>
  arr.every((e) => {
    return e !== undefined && e !== null;
  });

export const verifyToken = (authToken: string, type: AuthToken): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      authToken,
      type === TOKEN_TYPE.ACCESS ? config.jwtSecret : config.jwtRefreshSecret,
      (err, decoded) => {
        if (err) {
          reject(err);
          return;
        }

        if (decoded) {
          resolve(decoded);
        }
      },
    );
  });
};
