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
  subThreadUserId1: number | null;
  subThreadUserId2: number | null;
  subThreadUserId3: number | null;
  email: string;
  displayName: string;
  phoneNumber: string | null;
  image: string | null;
}

export const initialThread: Thread = {
  id: 0,
  userId: 0,
  channelId: 0,
  parentId: null,
  content: '첫번째 쓰레드를 작성해주세요! 😀',
  url: '',
  isEdited: 0,
  isPinned: 0,
  createdAt: '',
  emoji: [],
  subCount: 0,
  subThreadUserId1: null,
  subThreadUserId2: null,
  subThreadUserId3: null,
  email: '',
  displayName: '',
  phoneNumber: null,
  image: '',
};
