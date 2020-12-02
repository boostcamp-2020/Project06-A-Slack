import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { threadModel } from '@/models';
import { ERROR_MESSAGE } from '@/utils/constants';

/**
 * GET /api/threads/:threadId
 */
export const getSubThread = async (req: Request, res: Response, next: NextFunction) => {
  const { threadId } = req.params;
  if (Number.isNaN(Number(threadId))) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 500 });
    return;
  }
  try {
    const [parentThread] = await threadModel.getParentThread(Number(threadId));
    const [subThreadList] = await threadModel.getSubThread(Number(threadId));
    res.json({ parentThread, subThreadList });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/threads/:threadId
 */
export const modifyThread = (req: Request, res: Response, next: NextFunction): void => {
  const { threadId } = req.params;
  const { content } = req.body;

  if (verifyRequestData([content])) {
    res.status(200).end();
    return;
  }
  res.status(400).end();
};

/**
 * DELETE /api/threads/:threadId
 */
export const deleteThread = (req: Request, res: Response, next: NextFunction): void => {
  const { threadId } = req.params;
  res.status(200).end();
};

/**
 * POST /api/threads/:threadId/pin
 */
export const pinThread = (req: Request, res: Response, next: NextFunction): void => {
  const { threadId } = req.params;
  if (verifyRequestData([threadId])) {
    res.status(200).end();
    return;
  }
  res.status(400).json({ message: '필수 값 누락' });
};
