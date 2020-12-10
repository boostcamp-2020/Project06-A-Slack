import pool from '@/db';
import { GET_EMOJI_OF_THREAD_SQL, UPDATE_EMOJIES_OF_THREAD_SQL } from '@/utils/constants';

interface EmojiOfThread {
  id: number;
  userList: number[];
}

interface UpdateEmojiProps {
  emojiId: number;
  userId: number;
  threadId: number;
}

export const emojiService = {
  async updateEmoji({
    emojiId,
    userId,
    threadId,
  }: UpdateEmojiProps): Promise<{ emojisOfThread?: EmojiOfThread[]; err?: Error }> {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [[{ emoji }]]: any[] = await conn.execute(GET_EMOJI_OF_THREAD_SQL, [threadId]);
      let emojisOfThread: EmojiOfThread[] = emoji;

      const emojiIdx = emojisOfThread.findIndex(
        (emojiOfThread: EmojiOfThread) => +emojiOfThread.id === emojiId,
      );

      // 현재 emoji가 없는 경우 + 전체 이모지가 없을때
      if (emojiIdx === -1) {
        const newEmoji = { id: emojiId, userList: [userId] };
        emojisOfThread = [...emojisOfThread, newEmoji];
      }

      // emoji가 있는데, 해당 emoji의 userList에 userId가 있으면 유저 삭제, 없으면 유저 추가.
      if (emojiIdx !== -1 && emojisOfThread[emojiIdx]) {
        const targetUserList = emojisOfThread[emojiIdx].userList;
        const userIdx = targetUserList.findIndex((id) => id === userId);

        // 유저가 있으면 삭제
        if (userIdx !== -1) {
          targetUserList.splice(userIdx, 1);
          if (targetUserList.length === 0) {
            emojisOfThread.splice(emojiIdx, 1);
          }
        }

        // 유저가 없으면 추가
        if (userIdx === -1) {
          const { userList } = emojisOfThread[emojiIdx];
          userList.push(userId);
          const newEmojiState = { id: emojiId, userList };
          emojisOfThread[emojiIdx] = newEmojiState;
        }
      }

      const emojisOfThreadJson = JSON.stringify(emojisOfThread);
      const sql = conn.format(UPDATE_EMOJIES_OF_THREAD_SQL, [emojisOfThreadJson, threadId]);
      await conn.execute(sql);
      await conn.commit();
      return { emojisOfThread };
    } catch (err) {
      conn.rollback();
      console.error(err);
      return { err };
    } finally {
      conn.release();
    }
  },
};
