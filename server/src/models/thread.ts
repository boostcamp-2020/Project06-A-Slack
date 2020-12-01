import pool from '@/db';

export const threadModel = {
  getThreadInChannel(channelId: number): any {
    const sql = `SELECT id, user_id as userId, channel_id as channelId, content, url, is_edited as isEdited, is_pinned as isPinned, 
    is_deleted as isDeleted, parent_id as parentId, emoji, created_at as createdAt, sub_count as subCount, sub_thread_user_id_1 as subThreadUserId1, sub_thread_user_id_2 as subThreadUserId2, sub_thread_user_id_3 as subThreadUserId3  
    FROM slack.thread WHERE channel_id=? AND parent_id is null;`;
    return pool.execute(sql, [channelId]);
  },

  getSubThread(threadId: number): any {
    const sql = `SELECT id, user_id as userId, channel_id as channelId, content, url, is_edited as isEdited, is_pinned as isPinned, 
    is_deleted as isDeleted, parent_id as parentId, emoji, created_at as createdAt, sub_count as subCount, sub_thread_user_id_1 as subThreadUserId1, sub_thread_user_id_2 as subThreadUserId2, sub_thread_user_id_3 as subThreadUserId3 
    FROM slack.thread WHERE parent_id=?;`;
    return pool.execute(sql, [threadId]);
  },
};
