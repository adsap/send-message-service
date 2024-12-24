import { config } from 'dotenv';
import Bull from 'bull';

config();

export const birthdayQueue = new Bull('birthdayQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  limiter: {
    max: 10,
    duration: 1000,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: 5000,
  },
});
