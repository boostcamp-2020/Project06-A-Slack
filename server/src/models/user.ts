import pool from '@/db';

interface EditUserParams {
  id: number;
  displayName: string;
  phoneNumber: string;
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
  editUserById({ id, displayName, phoneNumber }: EditUserParams): any {
    const sql = `UPDATE user SET display_name=?, phone_number=? WHERE id=?;`;
    return pool.execute(sql, [displayName, phoneNumber, id]);
  },
};
