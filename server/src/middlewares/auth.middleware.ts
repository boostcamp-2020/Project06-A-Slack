import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '@/config';
import { ERROR_MESSAGE } from '@/utils/constants';

export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authToken = req.headers.authorization?.split('Bearer ')[1];
  if (authToken) {
    jwt.verify(authToken, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: ERROR_MESSAGE.INVALID_TOKEN });
        return;
      }

      if (decoded) {
        res.locals.authToken = authToken;
        next();
      }
    });
    return;
  }
  res.status(401).json({ message: ERROR_MESSAGE.LOGIN_REQUIRED });
};
