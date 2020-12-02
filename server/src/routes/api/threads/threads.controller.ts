import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { threadModel } from '@/models';
import { ERROR_MESSAGE } from '@/utils/constants';

/**
 * POST /api/threads
 */
export const createThread = (req: Request, res: Response, next: NextFunction): void => {
  const { userId, channelId, content, parentId } = req.body;
  if (verifyRequestData([userId, channelId, content])) {
    res.status(201).end();
    return;
  }
  res.status(400).json({ message: '필수 값 누락' });
};

/**
 * GET /api/threads/channels/:channelId
 */
export const getChannelThreads = async (req: Request, res: Response, next: NextFunction) => {
  // parentId가 null인 것만.
  const { channelId } = req.params;
  if (Number.isNaN(Number(channelId))) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 500 });
    return;
  }
  try {
    const [threadList] = await threadModel.getThreadInChannel(Number(channelId));

    res.json({ threadList });
  } catch (err) {
    next(err);
  }
};
