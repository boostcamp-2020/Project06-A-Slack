import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { userModel, channelModel } from '@/models';
import { ERROR_MESSAGE } from '@/utils/constants';

/**
 * GET /api/users/:userId
 */
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.params;
  if (Number.isNaN(+userId)) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  try {
    const [[user]] = await userModel.getUserById({ id: +userId });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const getJoinChannels = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  console.log(userId);
  if (Number.isNaN(+userId)) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  const [channelList] = await channelModel.getJoinChannels({ userId: +userId });
  res.json({ channelList });
};

/**
 * POST /api/users/:userId
 */
export const modifyUser = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;
  // TODO : 아래 코드에서 수정할 유저 값 undefined인지 검증
  // const {} = req.body;
  // if(verifyRequestData[]) {}
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
export const modifyLastChannel = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userId } = req.params;
  const { lastChannelId } = req.body;
  if (Number.isNaN(+userId)) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  if (verifyRequestData([lastChannelId])) {
    await userModel.modifyLastChannel({ lastChannelId, userId: +userId });
    return;
  }
  res.status(400).json({ message: '필수 값 누락' });
};
