import redis from 'async-redis';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS,
});

redisClient.on('error', (err) => {
  console.error(err);
});

export default redisClient;
