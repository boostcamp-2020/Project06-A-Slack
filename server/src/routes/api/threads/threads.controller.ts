import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { threadModel } from '@/models';
import { ERROR_MESSAGE } from '@/utils/constants';
import { threadService } from '@/services';

/**
 * POST /api/threads
 */
export const createThread = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userId, channelId, content, parentId } = req.body;
  if (verifyRequestData([userId, channelId, content]) && parentId !== undefined) {
    // userId, channelId, content, parentId 이상한값 예외처리 추후 추가
    try {
      const threadId = await threadService.createThread({ userId, channelId, content, parentId });
      res.status(201).json({ threadId });
      return;
    } catch (err) {
      next(err);
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

/**
 * GET /api/threads/channels/:channelId
 */
export const getChannelThreads = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { channelId } = req.params;
  if (Number.isNaN(Number(channelId))) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  try {
    const [threadList] = await threadModel.getThreadListInChannel({ channelId: +channelId });

    res.json({ threadList });
  } catch (err) {
    next(err);
  }
};
