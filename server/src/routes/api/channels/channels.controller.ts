import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';

/**
 * GET /api/channels
 */
export const getChannels = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ channels: [] });
};

/**
 * POST /api/channels
 */
export const makeChannel = (req: Request, res: Response, next: NextFunction) => {
  const { name, channelType, isPublic } = req.body;
  if (verifyRequestData([name, channelType, isPublic])) {
    return res.status(201).end();
  }
  res.status(400).json({ message: '필수 값 누락' });
};
