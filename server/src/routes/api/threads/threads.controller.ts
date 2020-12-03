import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/utils/utils';
import { threadModel } from '@/models';
import { ERROR_MESSAGE } from '@/utils/constants';

/**
 * 쓰레드 추가
 * POST /api/threads
 */
export const createThread = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userId, channelId, content, parentId } = req.body;
  if (verifyRequestData([userId, channelId, content]) && parentId !== undefined) {
    // userId, channelId, content, parentId 이상한값 예외처리 추후 추가
    try {
      const url = 'temp/url'; // 추후 url 생성 부분 추가
      const [result] = await threadModel.createThread(userId, channelId, content, parentId, url);
      // 1. threadCount 변경 2. subThread 추가 로직 구현
      /*
      1. parentId가 true면, parentId의 subCount 값 +1
      - await threadModel.updateSubCountOfThread(parentId);
      - UPDATE thread SET sub_count +1 WHERE id = ?(parent_id);
      2. parentId의 sub_thread_user_id 1,2,3이 null이고, 1,2,3에 해당 userId가 없으면 userId를 null에 추가.
      - sub_thread_user_id를 돌면서, 값이 있을때 existSubThreadUserIdList에 userId를 넣고, 
      없으면 existSubThreadUserIdList에 현재 userId값이 있는지 비교한 후, 있으면 넘어가고 없으면 update.
      - SELECT sub_thread_user_id_1, sub_thread_user_id_2, sub_thread_user_id_3 FROM thread 
      */
      await threadModel.updateSubCountOfThread(parentId);
      const [[parentThread]] = await threadModel.getThread(Number(parentId));
      const subThreadUserIdList: number[] = [
        parentThread.subThreadUserId1,
        parentThread.subThreadUserId2,
        parentThread.subThreadUserId3,
      ];

      if (!subThreadUserIdList.find((subThreadUserId) => subThreadUserId === userId)) {
        const updateIndex = subThreadUserIdList.findIndex(
          (subThreadUserId) => subThreadUserId === null,
        );
        // null인 자리가 있으면,
        if (updateIndex !== -1) {
          await threadModel.updateSubThreadUserIdOfThread(updateIndex + 1, userId, parentId);
        }
      }

      res.status(201).json({ result });
      return;
    } catch (err) {
      next(err);
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

/**
 * GET /api/threads/channels/:channelId
 */
export const getChannelThreads = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { channelId } = req.params;
  if (Number.isNaN(Number(channelId))) {
    next({ message: ERROR_MESSAGE.WRONG_PARAMS, status: 400 });
    return;
  }
  try {
    const [threadList] = await threadModel.getThreadListInChannel(Number(channelId));

    res.json({ threadList });
  } catch (err) {
    next(err);
  }
};
