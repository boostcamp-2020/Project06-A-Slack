import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import formidable, { IncomingForm } from 'formidable';

/**
 * POST /api/auth/login
 */
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, pw } = req.body;
  if (verifyRequestData([email, pw])) {
    res.status(200).end();
    return;
  }
  res.status(400).json({ message: '필수 값 누락' });
};

/**
 * POST /api/auth/logout
 */
export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).end();
};

/**
 * POST /api/auth/signup
 */
export const signup = (req: Request, res: Response, next: NextFunction) => {
  // TODO : formidable 적용해서 form-data로 받기
  res.status(201).end();

  // const { email, pw, image } = req.body;
  // console.log(email, pw, image);
  // if (verifyRequestData([email, pw])) {
  //   res.status(200).end();
  //   return;
  // }
  // res.status(400).json({ message: '필수 값 누락' });
};
