import pool from '@/db';

export const threadModel = {
  getThreadListInChannel({ channelId }: { channelId: number }): any {
    const sql = `SELECT thread.id AS id, user_id AS userId, channel_id AS channelId, content, url, is_edited AS isEdited, is_pinned AS isPinned, 
    thread.is_deleted AS isDeleted, parent_id AS parentId, emoji, thread.created_at AS createdAt, sub_count AS subCount, sub_thread_user_id_1 AS subThreadUserId1, 
    sub_thread_user_id_2 AS subThreadUserId2, sub_thread_user_id_3 AS subThreadUserId3,  
    email, display_name AS displayName, phone_number AS phoneNumber, image
    FROM thread LEFT JOIN user ON (user.id = thread.user_id)
    WHERE channel_id=? AND parent_id is null AND thread.is_deleted=0;`;
    return pool.execute(sql, [channelId]);
  },
  getSubThreadList({ threadId }: { threadId: number }): any {
    const sql = `SELECT thread.id, user_id AS userId, channel_id AS channelId, content, url, is_edited AS isEdited, is_pinned AS isPinned, 
    thread.is_deleted AS isDeleted, parent_id AS parentId, emoji, thread.created_at AS createdAt, sub_count AS subCount, sub_thread_user_id_1 AS subThreadUserId1, sub_thread_user_id_2 AS subThreadUserId2, sub_thread_user_id_3 AS subThreadUserId3, 
    email, display_name AS displayName, phone_number AS phoneNumber, image
    FROM thread LEFT JOIN user ON (user.id = thread.user_id)
    WHERE parent_id=? AND thread.is_deleted=0;`;
    return pool.execute(sql, [threadId]);
  },
  getThread({ threadId }: { threadId: number }): any {
    const sql = `SELECT thread.id AS id, user_id AS userId, channel_id AS channelId, content, url, is_edited AS isEdited, is_pinned AS isPinned, 
    thread.is_deleted AS isDeleted, parent_id AS parentId, emoji, thread.created_at AS createdAt, sub_count AS subCount, sub_thread_user_id_1 AS subThreadUserId1, sub_thread_user_id_2 AS subThreadUserId2, sub_thread_user_id_3 AS subThreadUserId3, 
    email, display_name AS displayName, phone_number AS phoneNumber, image
    FROM thread LEFT JOIN user ON (user.id = thread.user_id)
    WHERE thread.id=? AND thread.is_deleted=0;`;
    return pool.execute(sql, [threadId]);
  },
  createThread({
    userId,
    channelId,
    content,
    parentId,
    url,
  }: {
    userId: number;
    channelId: number;
    content: string;
    parentId: number;
    url: string;
  }): any {
    const sql = `INSERT INTO thread (user_id, channel_id, content, parent_id, url) VALUES (?,?,?,?,?)`;
    return pool.execute(sql, [userId, channelId, content, parentId, url]);
  },
  updateSubCountOfThread({ parentId }: { parentId: number }): any {
    const sql = `UPDATE thread SET sub_count=sub_count+1 WHERE id=?;`;
    return pool.execute(sql, [parentId]);
  },
  updateSubThreadUserIdOfThread({
    updateIndex,
    userId,
    parentId,
  }: {
    updateIndex: number;
    userId: number;
    parentId: number;
  }): any {
    const sql = `UPDATE thread SET sub_thread_user_id_${updateIndex}=? WHERE id=?;`;
    return pool.execute(sql, [userId, parentId]);
  },
  updateThread({ content, threadId }: { content: string; threadId: number }): any {
    const sql = `UPDATE thread SET content=? WHERE id=?;`;
    return pool.execute(sql, [content, threadId]);
  },
  deleteThread({ threadId }: { threadId: number }): any {
    const sql = `UPDATE thread SET is_deleted=1 WHERE id=?;`;
    return pool.execute(sql, [threadId]);
  },
};
