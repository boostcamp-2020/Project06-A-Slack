import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';

/**
 * GET /api/channels/:channelId
 */
export const getChannel = (req: Request, res: Response, next: NextFunction) => {
  const { channelId } = req.params;
  res.json({ channel: { channelId } });
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
