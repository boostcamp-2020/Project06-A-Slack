import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { channelModel } from '@/models';

/**
 * GET /api/channels/:channelId
 */
export const getChannel = async (req: Request, res: Response, next: NextFunction) => {
  const { channelId } = req.params;
  const [channel] = await channelModel.getChannel({ channelId: parseInt(channelId, 10) });
  const [users] = await channelModel.getChannelUser({ channelId: parseInt(channelId, 10) });
  res.json({ channel, users });
};

/**
 * POST /api/channels/:channelId/invite
 */
export const inviteChannel = (req: Request, res: Response, next: NextFunction) => {
  const { channelId } = req.params;
  const { userId } = req.body;
  if (verifyRequestData([userId])) {
    res.status(201).end();
    return;
  }
  res.status(400).json({ message: '필수 값 누락' });
};

/**
 * POST /api/channels/:channelId
 */
export const modifyChannel = (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;
  if (verifyRequestData([title])) {
    res.status(200).end();
    return;
  }
  res.status(400).json({ message: '필수 값 누락' });
};

/**
 * DELETE /api/channels/:channelId
 */
export const deleteChannel = (req: Request, res: Response, next: NextFunction) => {
  const { channelId } = req.params;
  res.status(200).end();
};
