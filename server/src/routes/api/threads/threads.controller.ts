import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';

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
export const getChannelThreads = (req: Request, res: Response, next: NextFunction): void => {
  const { channelId } = req.params;
  res.json({ users: [] });
};
