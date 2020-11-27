import pool from '@/db';

interface Args {
  channelId?: number;
}

export const channelModel = {
  getChannels() {
    const sql = `SELECT channel_type as channelType, id, description, is_public as isPublic, member_count as memeberCount, name, owner_id as ownerId FROM channel where is_deleted = 0`;
    return pool.execute(sql, []);
  },
  getChannelUser({ channelId }: { channelId: number }): any {
    const sql = `select user_channel.user_id as userId, 
    user.display_name as displayName
    from user
    join user_channel
    on user_channel.channel_id = ${channelId} and user_channel.user_id = user.id
    `;
    return pool.execute(sql, [channelId]);
  },
  getChannel({ channelId }: { channelId: number }): any {
    const sql = `select id, owner_id as ownerId, name, channel_type as channelType, is_public as isPublic, is_deleted as isDeleted, member_count as memberCount, description
    from channel
    where channel.id = ${channelId}
    `;
    return pool.execute(sql, [channelId]);
  },
};
