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
    const [subThreadList] = await threadModel.getSubThreadList(Number(threadId));
    res.json({ parentThread, subThreadList });
  } catch (err) {
    next(err);
  }
};

/**
 * 특정 쓰레드 수정
 * POST /api/threads/:threadId
 */
export const modifyThread = async (req: Request, res: Response, next: NextFunction) => {
  const { threadId } = req.params;
  const { content } = req.body;

  if (verifyRequestData([content])) {
    try {
      const result = await threadModel.updateThread(content, Number(threadId));
      res.status(200).json(result);
      return;
    } catch (err) {
      next(err);
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

/**
 * 쓰레드의 is_deteled를 1로 변경
 * DELETE /api/threads/:threadId
 */
export const deleteThread = async (req: Request, res: Response, next: NextFunction) => {
  const { threadId } = req.params;
  if (verifyRequestData([threadId])) {
    try {
      const result = await threadModel.deleteThread(Number(threadId));
      res.status(200).json(result);
      return;
    } catch (err) {
      next(err);
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

/**
 * POST /api/threads/:threadId/pin
 */
export const pinThread = (req: Request, res: Response, next: NextFunction) => {
  const { threadId } = req.params;
  if (verifyRequestData([threadId])) {
    res.status(200).end();
    return;
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
