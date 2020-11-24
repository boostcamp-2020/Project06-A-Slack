import pool from '@/db';

export const userModel = {
  getUserByEmail({ email }: { email: string }): any {
    const sql = `SELECT id, email, pw FROM user WHERE email=?;`;
    return pool.execute(sql, [email]);
  },
};
