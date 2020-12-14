import { channelModel } from '@/models';
import { join } from 'path';

interface JoinedUser {
  userId: number;
  displayName: string;
  image: string;
}

interface Channel {
  id?: number; // 채널 생성시 아이디가 없음
  ownerId: number;
  name: string;
  channelType: number;
  topic: string;
  isPublic: number;
  memberCount: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  unreadMessage?: boolean;
}

interface updateChannelTopicParams {
  channelId: number;
  topic: string;
}

interface updateChannelUsersParams {
  users: JoinedUser[];
  channel: Channel;
}

interface makeDMParams {
  ownerId: number;
  name: string;
  memberCount: number;
  isPublic: number;
  description: string;
  channelType: number;
  users: JoinedUser[];
}

export const channelService = {
  async updateChannelTopic({ channelId, topic }: updateChannelTopicParams): Promise<void> {
    await channelModel.modifyTopic({ channelId, topic });
  },
  async updateChannelUsers({ users, channel }: updateChannelUsersParams): Promise<JoinedUser> {
    const selectedUsers: [number[]] = users.reduce((acc: any, cur: JoinedUser) => {
      acc.push([cur.userId, channel.id]);
      return acc;
    }, []);

    await channelModel.joinChannel({
      selectedUsers,
      prevMemberCount: channel.memberCount,
      channelId: channel.id,
    });
    const [joinedUsers] = await channelModel.getChannelUser({
      channelId: channel.id,
    });

    return joinedUsers;
  },
  async makeDM({
    ownerId,
    name,
    memberCount,
    isPublic,
    description,
    channelType,
    users,
  }: makeDMParams): Promise<void> {
    const [newChannel] = await channelModel.createChannel({
      ownerId,
      name,
      memberCount,
      isPublic,
      description,
      channelType,
    });

    const [joinedUsers] = await channelModel.getChannelUser({
      channelId: newChannel.insertId,
    });

    const selectedUsers: [number[]] = users.reduce((acc: any, cur) => {
      acc.push([cur.userId, newChannel.insertId]);
      return acc;
    }, []);

    await channelModel.joinChannel({
      channelId: newChannel.insertId,
      prevMemberCount: joinedUsers.length,
      selectedUsers,
    });
  },
};
