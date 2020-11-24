import pool from '@/db';

export const channelModel = {
  getChannels() {
    const sql = `SELECT channel_type as channelType, id, description, is_public as isPublic, member_count as memeberCount, name, owner_id as ownerId FROM channel`;
    return pool.execute(sql, []);
  },
};
