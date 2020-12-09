import { User } from '@/types';

export interface Channel {
  id: number;
  ownerId: number;
  name: string;
  channelType: number;
  topic: string;
  isPublic: number;
  description: string;
  memberCount: number;
  pickUsers?: User[];
  createdAt?: string;
  updatedAt?: string;
  unreadMessage?: boolean;
}
