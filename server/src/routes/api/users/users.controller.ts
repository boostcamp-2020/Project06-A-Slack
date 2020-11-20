import { Request, Response, NextFunction } from 'express';
import { verify } from '@/utils/utils';

/**
 * GET /api/users
 */
export const getUsers = (req: Request, res: Response, next: NextFunction): void => {
  res.json({ users: [] });
};

/**
 * GET /api/users/:userId
 */
export const getUser = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;
  res.json({ user: { userId } });
};

/**
 * POST /api/users/:userId
 */
export const modifyUser = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;
  // TODO : 아래 코드에서 수정할 유저 값 undefined인지 검증
  // const {} = req.body;
  // if(verify[]) {}
  res.status(201).end();
};

/**
 * DELETE /api/users/:userId
 */
export const deleteUser = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;
  res.status(200).end();
};

/**
 * POST /api/users/:userId/last-channel
 */
export const modifyLastChannel = (req: Request, res: Response, next: NextFunction): void => {
  const { channelId } = req.body;
  if (verify([channelId])) {
    res.status(200).end();
    return;
  }
  res.status(400).json({ message: '필수 값 누락' });
};
