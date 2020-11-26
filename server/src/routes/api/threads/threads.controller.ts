import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { threadModel } from '@/models';

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
 * GET /api/channels/:channelId
 */
export const getChannelThreads = async (req: Request, res: Response, next: NextFunction) => {
  // subthread까지 가져오도록 수정 필요.
  const { channelId } = req.params;
  const [threadList] = await threadModel.getThreadInChannel(Number(channelId));
  res.json({ threadList });
};
