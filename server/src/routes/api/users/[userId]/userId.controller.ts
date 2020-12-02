import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { userModel, channelModel } from '@/models';
import { ERROR_MESSAGE } from '@/utils/constants';

/* userId 공통 처리 함수 */
export const checkUserIdParam = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;
  if (Number.isNaN(+userId)) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  next();
};

/**
 * GET /api/users/:userId
 */
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.params;
  try {
    const [[user]] = await userModel.getUserById({ id: +userId });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/users/:userId/channels
 */
export const getJoinedChannels = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userId } = req.params;
  try {
    const [channelList] = await channelModel.getJoinChannels({ userId: +userId });
    res.json({ channelList });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/users/:userId
 */
export const modifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userId } = req.params;
  const { displayName, phoneNumber } = req.body;
  try {
    if (verifyRequestData([displayName, phoneNumber])) {
      await userModel.editUserById({ id: +userId, displayName, phoneNumber });
      res.status(201).end();
      return;
    }
    res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
  } catch (err) {
    next(err);
  }
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
  if (verifyRequestData([channelId])) {
    res.status(200).end();
    return;
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
