import { threadModel } from '@/models';
import { Thread } from '@/types';
import pool from '@/db';
import {
  DECREASE_SUB_COUNT_OF_THREAD_SQL,
  DELETE_THREAD_SQL,
  GET_SUB_THREAD_LIST_SQL,
  GET_THREAD_SQL,
} from '@/utils/constants';

interface CreateThreadParams {
  userId: number;
  channelId: number;
  content: string;
  parentId: number | null;
}

interface DeleteThreadParams {
  id: number;
  parentId: number | null;
  userId: number;
}

export const threadService = {
  async createThread({
    userId,
    channelId,
    content,
    parentId,
  }: CreateThreadParams): Promise<number> {
    const url = 'temp/url'; // 추후 url 생성 부분 추가
    const [{ insertId }] = await threadModel.createThread({
      userId,
      channelId,
      content,
      parentId,
      url,
    });
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
    if (parentId) {
      await threadModel.increaseSubCountOfThread({ parentId: +parentId });
      const [[parentThread]] = await threadModel.getThread({ threadId: +parentId });
      const subThreadUserIdList = [
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
          await threadModel.updateSubThreadUserIdOfThread({
            updateIndex: updateIndex + 1,
            userId,
            parentId,
          });
        }
      }
    }
    return insertId;
  },
  async deleteThread({
    id,
    parentId,
    userId,
  }: DeleteThreadParams): Promise<{ deletedThread?: Thread; parentThread?: Thread; err?: Error }> {
    // const deletedId = await threadModel.deleteThread({ threadId: id });
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.execute(DELETE_THREAD_SQL, [id]);

      if (parentId === null) {
        const [[deletedThread]]: any[] = await conn.execute(GET_THREAD_SQL, [id]);
        await conn.commit();
        return { deletedThread };
      }

      const [[parentThread]]: any[] = await conn.execute(GET_THREAD_SQL, [parentId]);
      if (parentThread.subCount === 0) {
        const [[deletedThread]]: any[] = await conn.execute(GET_THREAD_SQL, [id]);
        await conn.commit();
        return { deletedThread, parentThread };
      }

      // parentThread.subCount > 0 일때 이후의 작업
      const subThreadUserIdList = [
        parentThread.subThreadUserId1,
        parentThread.subThreadUserId2,
        parentThread.subThreadUserId3,
      ];

      const updateIndex = subThreadUserIdList.findIndex(
        (subThreadUserId) => subThreadUserId === userId,
      );

      await conn.execute(DECREASE_SUB_COUNT_OF_THREAD_SQL, [parentId]);
      const [subThreadList]: any[] = await conn.execute(GET_SUB_THREAD_LIST_SQL, [parentId]);

      // 지금 subThread에 userId가 작성한 subThread가 있는지. 체크. 있으면 pass.
      const lengthOfsameUsersInSubThread = subThreadList.filter(
        (st: Thread) => st.userId === userId && st.isDeleted === 0,
      ).length;

      if (lengthOfsameUsersInSubThread === 0) {
        await conn.execute(
          `
        UPDATE thread SET sub_thread_user_id_${updateIndex + 1}=? WHERE id=?;`,
          [null, parentId],
        );
      }
      const [[deletedThread]]: any[] = await conn.execute(GET_THREAD_SQL, [id]);
      const [[updatedParentThread]]: any[] = await conn.execute(GET_THREAD_SQL, [parentId]);

      await conn.commit();
      return { deletedThread, parentThread: updatedParentThread };
    } catch (err) {
      conn.rollback();
      console.error(err);
      return { err };
    } finally {
      conn.release();
    }
  },
};
