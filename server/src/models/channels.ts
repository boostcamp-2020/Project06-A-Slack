/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import pool from '@/db';

interface createInfo {
  ownerId: number;
  name: string;
  channelType: number;
  isPublic: number;
  description: string;
}

interface JoinInfo {
  userId: number;
  channelId: number;
}

export const channelModel = {
  getChannels() {
    const sql = `SELECT channel_type as channelType, id, description, is_public as isPublic, 
    member_count as memeberCount, name, owner_id as ownerId, topic FROM channel WHERE is_deleted = 0 AND is_public=1`;
    return pool.query(sql);
  },
  getJoinChannels({ userId }: { userId: number }): any {
    const sql = `SELECT channel_type as channelType, id, description, is_public as isPublic, 
    member_count as memeberCount, name, owner_id as ownerId, topic
    FROM channel 
    JOIN user_channel
    ON user_channel.user_id = ? AND user_channel.channel_id = channel.id
    WHERE channel.is_deleted = 0
    `;
    return pool.execute(sql, [userId]);
  },
  getChannelUser({ channelId }: { channelId: number }): any {
    const sql = `SELECT user_channel.user_id as userId, 
    user.display_name as displayName
    FROM user
    JOIN user_channel
    ON user_channel.channel_id = ? and user_channel.user_id = user.id
    `;
    return pool.execute(sql, [channelId]);
  },
  getChannel({ channelId }: { channelId: number }): any {
    const sql = `SELECT id, owner_id as ownerId, name, channel_type as channelType, is_public as isPublic, 
    is_deleted as isDeleted, member_count as memberCount, description
    FROM channel
    WHERE channel.id = ?
    `;
    return pool.execute(sql, [channelId]);
  },
  createChannel({ ownerId, name, channelType, isPublic, description }: createInfo): any {
    const sql = `INSERT INTO channel (owner_id, name, channel_type, is_public, description) VALUES (?, ?, ?, ?, ?)`;
    return pool.execute(sql, [ownerId, name, channelType, isPublic, description]);
  },
  joinChannel({ userId, channelId }: JoinInfo): any {
    const sql = `INSERT INTO user_channel (user_id, channel_id) VALUES(?, ?)`;
    return pool.execute(sql, [userId, channelId]);
  },
};
