import pool from '@/db';
import { Model } from '@/types';

interface EditUserParams {
  id: number;
  displayName: string;
  phoneNumber: string;
  image: string | undefined;
  setDefault: number;
}

interface SearchUserParams {
  displayName: string;
  channelId: number;
  isDM: boolean;
}

export const userModel = {
  getUsers(): any {
    const sql = `SELECT id, email, display_name as displayName, image
    FROM user`;
    return pool.query(sql);
  },
  getUserByEmail({ email }: { email: string }): any {
    const sql = `SELECT id, pw, email, display_name as displayName, phone_number as phoneNumber, 
    image, last_channel_id as lastChannelId 
    FROM user WHERE email=?;`;
    return pool.execute(sql, [email]);
  },
  getUserById({ id }: { id: number }): any {
    const sql = `SELECT id, email, display_name as displayName, phone_number as phoneNumber, 
    image, last_channel_id as lastChannelId 
    FROM user WHERE id=?;`;
    return pool.execute(sql, [id]);
  },
  modifyLastChannel({ lastChannelId, userId }: { lastChannelId: number; userId: number }): any {
    const sql = `UPDATE user SET last_channel_id = ? WHERE id = ?`;
    return pool.execute(sql, [lastChannelId, userId]);
  },
  editUserById({ id, displayName, phoneNumber, image, setDefault }: EditUserParams): any {
    if (setDefault) {
      const sql = `UPDATE user SET display_name=?, phone_number=?, image=DEFAULT WHERE id=?;`;
      return pool.execute(sql, [displayName, phoneNumber, id]);
    }
    if (image) {
      const sql = `UPDATE user SET display_name=?, phone_number=?, image=? WHERE id=?;`;
      return pool.execute(sql, [displayName, phoneNumber, image, id]);
    }
    const sql = `UPDATE user SET display_name=?, phone_number=? WHERE id=?;`;
    return pool.execute(sql, [displayName, phoneNumber, id]);
  },
  searchUsers({ displayName, channelId, isDM }: SearchUserParams): any {
    if (!isDM) {
      const sql = `SELECT id, email, display_name as displayName, phone_number as phoneNumber, image
      FROM user
      WHERE display_name LIKE ? AND id NOT IN (
        SELECT user_id FROM user_channel
        WHERE channel_id = ?
      )`;
      return pool.execute(sql, [`%${displayName}%`, channelId]);
    }
    const sql = `SELECT id, email, display_name as displayName, phone_number as phoneNumber, image
    FROM user
    WHERE display_name LIKE ?`;
    return pool.execute(sql, [`%${displayName}%`]);
  },
  addUser({ email, pw, displayName }: { email: string; pw: string; displayName: string }): any {
    const sql = `INSERT INTO user (email, pw, display_name) VALUES (?, ?, ?);`;
    return pool.execute(sql, [email, pw, displayName]);
  },
  addOAuthUser({
    email,
    displayName,
    image,
  }: {
    email: string;
    displayName: string;
    image?: string;
  }): any {
    if (image) {
      const sql = `INSERT INTO user (email, display_name, image) VALUES (?, ?, ?);`;
      return pool.execute(sql, [email, displayName, image]);
    }
    const sql = `INSERT INTO user (email, display_name) VALUES (?, ?);`;
    return pool.execute(sql, [email, displayName]);
  },
};
