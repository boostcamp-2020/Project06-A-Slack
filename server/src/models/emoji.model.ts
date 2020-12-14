import pool from '@/db';
import { Model } from '@/types';

export const emojiModel: Model = {
  getEmojiList() {
    const sql = `SELECT id, name, url from emoji`;
    return pool.execute(sql);
  },
  createEmoji({ name, url }: { name: string; url: string }) {
    const sql = ``;
    return pool.execute(sql, [name, url]);
  },
};
