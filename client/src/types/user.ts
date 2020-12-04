export interface User {
  id: number;
  email: string;
  displayName: string;
  phoneNumber: string | null;
  image: string;
  lastChannelId: number | null;
}
