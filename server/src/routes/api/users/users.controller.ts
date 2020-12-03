import { Request, Response, NextFunction } from 'express';
import { userModel } from '@/models';
/**
 * GET /api/users
 */
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [users] = await userModel.getUsers();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};
