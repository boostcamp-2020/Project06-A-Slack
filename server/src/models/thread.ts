import pool from '@/db';

export const threadModel = {
  getThreadInChannel(channelId: number): any {
    const sql = `SELECT thread.id as id, user_id as userId, channel_id as channelId, content, url, is_edited as isEdited, is_pinned as isPinned, 
    thread.is_deleted as isDeleted, parent_id as parentId, emoji, thread.created_at as createdAt, sub_count as subCount, sub_thread_user_id_1 as subThreadUserId1, 
    sub_thread_user_id_2 as subThreadUserId2, sub_thread_user_id_3 as subThreadUserId3,  
    email, display_name as displayName, phone_number as phoneNumber, image
    FROM slack.thread LEFT JOIN user on (user.id = thread.user_id)
    WHERE channel_id=? AND parent_id is null;`;
    return pool.execute(sql, [channelId]);
  },
  getSubThread(threadId: number): any {
    const sql = `SELECT thread.id, user_id as userId, channel_id as channelId, content, url, is_edited as isEdited, is_pinned as isPinned, 
    thread.is_deleted as isDeleted, parent_id as parentId, emoji, thread.created_at as createdAt, sub_count as subCount, sub_thread_user_id_1 as subThreadUserId1, sub_thread_user_id_2 as subThreadUserId2, sub_thread_user_id_3 as subThreadUserId3, 
    email, display_name as displayName, phone_number as phoneNumber, image
    FROM slack.thread LEFT JOIN user on (user.id = thread.user_id)
    WHERE parent_id=?;`;
    return pool.execute(sql, [threadId]);
  },
  getParentThread(threadId: number): any {
    const sql = `SELECT thread.id as id, user_id as userId, channel_id as channelId, content, url, is_edited as isEdited, is_pinned as isPinned, 
    thread.is_deleted as isDeleted, parent_id as parentId, emoji, thread.created_at as createdAt, sub_count as subCount, sub_thread_user_id_1 as subThreadUserId1, sub_thread_user_id_2 as subThreadUserId2, sub_thread_user_id_3 as subThreadUserId3, 
    email, display_name as displayName, phone_number as phoneNumber, image
    FROM slack.thread LEFT JOIN user on (user.id = thread.user_id)
    WHERE thread.id=?;`;
    return pool.execute(sql, [threadId]);
  },
};
