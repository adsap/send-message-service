import cron from 'node-cron';
import moment from 'moment-timezone';
import { config } from 'dotenv';
import { UserService } from '../services/user.service';
import { birthdayQueue } from '../queues/birthday.queue';

config();

export class BirthdayScheduler {
  private userService: UserService;
  private birthdayMessageTime: string;

  constructor() {
    this.userService = new UserService();
    this.birthdayMessageTime = process.env.BIRTHDAY_MESSAGE_TIME || '09:00:00';
  }

  start() {
    // Run every minute
    cron.schedule('* * * * *', async () => {
      const currentDate = moment().format('MM-DD');
      const now = moment.utc();

      const users =
        await this.userService.getUsersForBirthdayCheck(currentDate);

      users.forEach((user) => {
        const userLocalBirthdayThisYear = moment.tz(
          `${now.year()}-${moment(user.birthday).format('MM-DD')} ${this.birthdayMessageTime}`,
          user.timezone,
        );
        const nowInUserTimezone = now.clone().tz(user.timezone);

        const formattedNow = nowInUserTimezone.format('YYYY-MM-DD HH:mm');
        const formattedBirthday =
          userLocalBirthdayThisYear.format('YYYY-MM-DD HH:mm');

        if (formattedNow === formattedBirthday) {
          birthdayQueue.add({
            user,
          });
        }
      });
    });

    // retry unsent message every 5 minutes
    cron.schedule('*/5 * * * *', async () => {
      const currentDate = moment().format('MM-DD');
      const now = moment.utc();
      const users =
        await this.userService.getUsersWithUnsentBirthdayMessage(currentDate);

      users.forEach((user) => {
        const userLocalBirthdayThisYear = moment.tz(
          `${now.year()}-${moment(user.birthday).format('MM-DD')} ${this.birthdayMessageTime}`,
          user.timezone,
        );
        const nowInUserTimezone = now.clone().tz(user.timezone);

        const formattedNow = nowInUserTimezone.format('YYYY-MM-DD HH:mm');
        const formattedBirthday =
          userLocalBirthdayThisYear.format('YYYY-MM-DD HH:mm');

        if (formattedNow > formattedBirthday) {
          birthdayQueue.add({
            user,
          });
        }
      });
    });

    // Reset 'is_sent' to false once a year (on January 1st)
    cron.schedule('0 0 1 1 *', async () => {
      console.log('Reset all is_sent to false for the new year');
      await this.userService.resetAllStatusMessages();
    });
  }
}
