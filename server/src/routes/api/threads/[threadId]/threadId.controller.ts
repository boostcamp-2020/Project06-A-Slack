import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';

/**
 * GET /api/threads/:threadId
 */
export const getThread = (req: Request, res: Response, next: NextFunction): void => {
  const { threadId } = req.params;
  res.json({ thread: { threadId } });
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
