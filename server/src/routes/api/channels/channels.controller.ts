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
export const createChannel = async (req: Request, res: Response, next: NextFunction) => {
  const { ownerId, name, channelType, isPublic, description, memberCount } = req.body;
  if (verifyRequestData([ownerId, name, channelType, isPublic, memberCount])) {
    const [channel] = await channelModel.createChannel({
      ownerId,
      name,
      channelType,
      isPublic,
      description,
      memberCount,
    });
    res.status(201).json({ channel });
    return;
  }
  res.status(400).json({ message: '필수 값 누락' });
};

/**
 * POST /api/channels/check-duplicated
 */
export const checkDuplicatedChannel = async (req: Request, res: Response): Promise<void> => {
  const { channelName } = req.body;
  if (verifyRequestData([channelName])) {
    const [[channelId]] = await channelModel.checkDuplicatedChannel({ channelName });
    if (channelId) {
      res.json({ isDuplicated: true });
      return;
    }
    res.json({ isDuplicated: false });
    return;
  }
  res.status(400).json({ message: '필수 값 누락' });
};
