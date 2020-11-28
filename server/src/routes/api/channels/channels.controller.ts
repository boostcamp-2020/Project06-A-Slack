import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { channelModel } from '@/models';
/**
 * GET /api/channels
 */
export const getChannels = async (req: Request, res: Response, next: NextFunction) => {
  const [channelList] = await channelModel.getChannels();
  res.json({ channelList });
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
