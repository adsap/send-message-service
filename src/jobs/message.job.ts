import axios from 'axios';
import { config } from 'dotenv';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

config();

export class MessageJob {
  static async queueBirthdayMessage(user: UserEntity) {
    try {
      const response = await axios.post(
        `${process.env.EMAIL_SERVICE_URL}/send-email`,
        {
          email: user.email,
          message: `Hey, ${user.first_name} ${user.last_name} it's your birthday`,
        },
      );

      if (response.status === 200) {
        const userService = new UserService();
        await userService.markBirthdayMessageAsSent(user.id);
        console.log(
          `Birthday message successfully sent to ${user.first_name} ${user.last_name}`,
        );
      } else {
        console.error(
          `Failed to send birthday message to ${user.first_name} ${user.last_name} - Status: ${response.status}`,
        );
      }
    } catch (err) {
      console.error('Error sending birthday message:', err);
    }
  }
}
