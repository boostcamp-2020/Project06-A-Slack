export interface Channel {
  id: number;
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
