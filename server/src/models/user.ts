import pool from '@/db';

interface EditUserParams {
  id: number;
  displayName: string;
  phoneNumber: string;
  image: string | undefined;
  setDefault: number;
}

export const userModel = {
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
};
