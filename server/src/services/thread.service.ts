import { threadModel } from '@/models';

interface CreateThreadParams {
  userId: number;
  channelId: number;
  content: string;
  parentId: number | null;
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
};
