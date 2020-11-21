import { Request, Response, NextFunction } from 'express';

/**
 * GET /api/users
 */
export const getUsers = (req: Request, res: Response, next: NextFunction): void => {
  res.json({ users: [] });
};
