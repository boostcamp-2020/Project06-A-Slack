export interface User {
  id: number;
  email: string;
  displayName: string;
  phoneNumber: string;
  image: string;
  lastChannelId: string | null;
}
