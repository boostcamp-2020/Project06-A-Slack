import pool from '@/db';

export const threadModel = {
  getThreadInChannel(channelId: number): any {
    const sql =
      'SELECT id, user_id as userId, channel_id as channelId, content, url, is_edited as isEdited, is_pinned as isPinned,' +
      ' is_deleted as isDeleted, parent_id as parentId, emoji, created_at as createdAt FROM slack.thread WHERE channel_id=?;';
    return pool.execute(sql, [channelId]);
  },
};
