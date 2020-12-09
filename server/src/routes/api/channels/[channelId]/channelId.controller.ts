import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { channelModel } from '@/models';
import { ERROR_MESSAGE } from '@/utils/constants';
import { User } from '@/types';

/**
 * GET /api/channels/:channelId
 */
export const getChannel = async (req: Request, res: Response, next: NextFunction) => {
  const { channelId } = req.params;
  if (Number.isNaN(+channelId)) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  const [[channel]] = await channelModel.getChannel({ channelId: +channelId });
  const [users] = await channelModel.getChannelUser({ channelId: +channelId });
  res.json({ channel, users });
};

/**
 * POST /api/channels/:channelId/invite
 */
export const inviteChannel = async (req: Request, res: Response, next: NextFunction) => {
  const { channelId } = req.params;
  const { users } = req.body;
  if (Number.isNaN(+channelId)) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  if (verifyRequestData([users, channelId])) {
    const joinUsers: [number[]] = users.reduce((acc: [number[]], cur: User) => {
      acc.push([cur.id, +channelId]);
      return acc;
    }, []);
    const [joinedUsers] = await channelModel.getChannelUser({ channelId: +channelId });
    await channelModel.joinChannel({
      joinUsers,
      joinedNumber: joinedUsers.length,
      channelId: +channelId,
    });
    res.status(200).end();
    return;
  }
  res.status(400).json({ message: '필수 값 누락' });
};

/**
 * POST /api/channels/:channelId/topic
 */

export const modifyTopic = async (req: Request, res: Response, next: NextFunction) => {
  const { channelId } = req.params;
  const { topic } = req.body;
  if (Number.isNaN(+channelId)) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  if (verifyRequestData([topic])) {
    await channelModel.modifyTopic({ channelId: +channelId, topic });
    res.status(200).end();
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
