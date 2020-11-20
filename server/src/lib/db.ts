import mysql2 from 'mysql2/promise';
import config from '@config/index';

const pool = mysql2.createPool(process.env.MODE === 'dev' ? config.devDB : config.DB);

export default pool;
