import { birthdayQueue } from '../queues/birthday.queue';
import { MessageJob } from '../jobs/message.job';

birthdayQueue.process(async (job) => {
  const user = job.data.user;
  try {
    await MessageJob.queueBirthdayMessage(user);
    console.log(`Message sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
});
