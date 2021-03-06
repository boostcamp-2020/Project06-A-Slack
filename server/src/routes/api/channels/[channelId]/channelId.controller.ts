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
export const inviteChannel = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { channelId } = req.params;
  const { users } = req.body;
  if (Number.isNaN(+channelId)) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  if (verifyRequestData([users, channelId])) {
    const selectedUsers: [number[]] = users.reduce((acc: [number[]], cur: User) => {
      acc.push([cur.id, +channelId]);
      return acc;
    }, []);
    const [joinedUsers] = await channelModel.getChannelUser({ channelId: +channelId });
    await channelModel.joinChannel({
      selectedUsers,
      prevMemberCount: joinedUsers.length,
      channelId: +channelId,
    });
    res.status(200).end();
    return;
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

/**
 * POST /api/channels/:channelId/topic
 */

export const modifyTopic = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { channelId } = req.params;
  const { topic } = req.body;
  if (Number.isNaN(+channelId)) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  if (verifyRequestData([topic])) {
    try {
      await channelModel.modifyTopic({ channelId: +channelId, topic });
      res.status(200).end();
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

/**
 * POST /api/channels/:channelId/unread
 */
export const setChannelUnreadFlag = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { channelId } = req.params;
  const { userId, unread } = req.body;
  if (Number.isNaN(+channelId)) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  if (verifyRequestData([userId, unread])) {
    await channelModel.setChannelUnreadFlag({ unread, userId, channelId: +channelId });
    res.status(200).end();
    return;
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

/**
 * POST /api/channels/:channelId
 */
export const modifyChannel = (req: Request, res: Response, next: NextFunction): void => {
  const { title } = req.body;
  if (verifyRequestData([title])) {
    res.status(200).end();
    return;
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

/**
 * DELETE /api/channels/:channelId
 */
export const deleteChannel = (req: Request, res: Response, next: NextFunction) => {
  const { channelId } = req.params;
  res.status(200).end();
};
