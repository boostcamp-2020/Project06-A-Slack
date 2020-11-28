interface Emoji {
  name: string;
  userId: number;
}

export interface Thread {
  id: number;
  userId: number;
  channelId: number;
  parentId: number | null;
  content: string;
  url: string;
  isEdited: number;
  isPinned: number;
  createdAt: string;
  emoji: Emoji[] | null;
  subCount: number;
  subThreadId1: number | null;
  subThreadId2: number | null;
  subThreadId3: number | null;
}
