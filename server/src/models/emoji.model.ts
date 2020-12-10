import pool from '@/db';

export const emojiModel = {
  getEmojiList(): any {
    const sql = `SELECT id, name, url from emoji`;
    return pool.execute(sql);
  },
  createEmoji({ name, url }: { name: string; url: string }): any {
    const sql = ``;
    return pool.execute(sql, [name, url]);
  },
};
