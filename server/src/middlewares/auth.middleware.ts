import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '@/config';

export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization?.split('Bearer ')[1];
  if (authToken) {
    jwt.verify(authToken, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: '유효하지 않는 토큰입니다.' });
        return;
      }

      if (decoded) {
        next();
      }
    });
    return;
  }
  res.status(401).json({ message: '로그인이 필요합니다.' });
};
