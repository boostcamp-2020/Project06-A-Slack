import { Request, Response, NextFunction } from 'express';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { verifyRequestData } from '@/utils/utils';
import { userModel, channelModel } from '@/models';
import { ERROR_MESSAGE } from '@/utils/constants';

/* userId 공통 처리 함수 */
export const checkUserIdParam = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;
  if (Number.isNaN(+userId)) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  next();
};

/**
 * GET /api/users/:userId
 */
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.params;
  try {
    const [[user]] = await userModel.getUserById({ id: +userId });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/users/:userId/channels
 */
export const getJoinedChannels = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userId } = req.params;
  try {
    const [channelList] = await channelModel.getJoinChannels({ userId: +userId });
    res.json({ channelList });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/users/:userId
 */
export const modifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userId } = req.params;

  try {
    const form = new IncomingForm();
    form.uploadDir = './src/public/imgs/profile/';
    form.keepExtensions = true;
    form.multiples = true;

    let imgSrc: string;
    const imageRegex = /.(jpg|jpeg|png|gif)$/i;

    form.on('fileBegin', (name, file) => {
      imgSrc = `${Date.now()}_${file.name}`;
      // eslint-disable-next-line no-param-reassign
      file.path = `${form.uploadDir}${imgSrc}`;
    });

    const port = req.app.get('port');
    const prefix = `${req.protocol}://${req.hostname}${port !== 80 ? `:${port}` : ''}`;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      const { displayName, phoneNumber, setDefault } = fields;
      const { image } = files;

      if (image?.name && !image.name.match(imageRegex)) {
        try {
          await fs.unlink(path.join(__dirname, '../../../../../', image.path));
        } catch (error) {
          console.log('file delete error', error.message);
        }

        res.status(500).json({ message: ERROR_MESSAGE.NOT_ALLOWED_FILE_TYPE });
        return;
      }

      if (verifyRequestData([displayName, phoneNumber, setDefault])) {
        const imgUrl = image ? `${prefix}/imgs/profile/${imgSrc}` : undefined;
        await userModel.editUserById({
          id: +userId,
          displayName: displayName as string,
          phoneNumber: phoneNumber as string,
          image: imgUrl,
          setDefault: +setDefault,
        });

        res.json({ image: imgUrl });
        return;
      }
      res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/users/:userId
 */
export const deleteUser = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = req.params;
  res.status(200).end();
};

/**
 * POST /api/users/:userId/last-channel
 */
export const modifyLastChannel = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userId } = req.params;
  const { lastChannelId } = req.body;
  if (verifyRequestData([lastChannelId])) {
    try {
      await userModel.modifyLastChannel({ lastChannelId, userId: +userId });
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
 * GET /api/users/:userId/channels/unsubscribed
 */
export const getNotJoinedChannels = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userId } = req.params;
  try {
    const [notJoinedChannelList] = await channelModel.getNotJoinedChannels({ userId: +userId });
    res.status(200).json({ notJoinedChannelList });
    return;
  } catch (err) {
    next(err);
  }
};
