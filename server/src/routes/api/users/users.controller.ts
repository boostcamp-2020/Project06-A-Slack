import { Request, Response, NextFunction } from 'express';
import { channelModel, userModel } from '@/models';
import { verifyRequestData } from '@/utils/utils';

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

/**
 * GET /api/users/search
 */
export const searchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { displayName, channelId, isDM } = req.body;
    if (verifyRequestData([displayName, channelId])) {
      const [users] = await userModel.searchUsers({ displayName, channelId, isDM });
      res.status(200).json({ users });
      return;
    }
  } catch (err) {
    next(err);
  }
};
