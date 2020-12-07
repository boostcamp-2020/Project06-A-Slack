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

export const matchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { displayName, channelId, first } = req.body;
    if (verifyRequestData([displayName, channelId])) {
      const [matchUsersInfo] = await userModel.matchUsers({ displayName, channelId, first });
      res.status(200).json({ matchUsersInfo });
      return;
    }
  } catch (err) {
    next(err);
  }
};
