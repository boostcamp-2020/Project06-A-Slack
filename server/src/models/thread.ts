import pool from '@/db';

export const threadModel = {
  getThreadInChannel(channelId: number): any {
    const sql = `SELECT id, user_id as userId, channel_id as channelId, content, url, is_edited as isEdited, is_pinned as isPinned, 
    is_deleted as isDeleted, parent_id as parentId, emoji, created_at as createdAt, sub_count as subCount, subthread_id_1 as subThreadId1, subthread_id_2 as subThreadId2, subthread_id_3 as subThreadId3 FROM slack.thread WHERE channel_id=1 AND parent_id is null;`;
    return pool.execute(sql, [channelId]);
  },

  getSubThread(threadId: number): any {
    const sql = `SELECT id, user_id as userId, channel_id as channelId, content, url, is_edited as isEdited, is_pinned as isPinned, is_deleted as isDeleted, parent_id as parentId, emoji, created_at as createdAt, sub_count as subCount, subthread_id_1 as subThreadId1, subthread_id_2 as subThreadId2, subthread_id_3 as subThreadId3 FROM slack.thread WHERE parent_id=?;`;
    return pool.execute(sql, [threadId]);
  },
};
