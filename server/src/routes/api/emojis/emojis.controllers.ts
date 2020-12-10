import { Request, Response, NextFunction } from 'express';
import { emojiModel } from '@/models';
import { verifyRequestData } from '@/utils/utils';

/**
 * GET /api/emojis
 */
export const getEmojiList = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const [emojiList] = await emojiModel.getEmojiList();
    res.status(200).json({ emojiList });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/emojis
 */
export const createEmoji = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, url } = req.body;
    if (verifyRequestData([name, url])) {
      const [createedEmojiInfo] = await emojiModel.createEmoji({ name, url });
      res.status(201).json({ createedEmojiInfo });
      return;
    }
  } catch (err) {
    next(err);
  }
};
