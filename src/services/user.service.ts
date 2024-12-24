import moment from 'moment';
import 'moment-timezone';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import BadRequestError from '../errors/bad-request.error';
import { ERROR_MESSAGES } from '../constants/response.constant';
import NotFoundError from '../errors/not-found.error';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(payload: CreateUserDto): Promise<number> {
    try {
      const { email, first_name, last_name, birthday } = payload;

      const existUser = await this.userRepository.findByEmail(email);
      if (existUser) {
        throw new BadRequestError(ERROR_MESSAGES.EMAIL_ALREADY_EXIST);
      }

      const userTimezone = moment.tz.guess();
      const userEntity = new UserEntity();
      userEntity.email = email;
      userEntity.first_name = first_name;
      userEntity.last_name = last_name;
      userEntity.birthday = moment(birthday).format('YYYY-MM-DD');
      userEntity.timezone = userTimezone;

      const newUser = await this.userRepository.save(userEntity);
      return newUser.id;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async updateUser(id: number, payload: UpdateUserDto): Promise<void> {
    try {
      const { email, first_name, last_name, birthday, is_sent } = payload;

      const existUser = await this.userRepository.findById(id);
      if (!existUser) throw new NotFoundError(ERROR_MESSAGES.DATA_NOT_FOUND);

      if (email) {
        const existEmail = await this.userRepository.findByEmail(email);

        if (existEmail && existEmail.id != id) {
          throw new BadRequestError(ERROR_MESSAGES.EMAIL_ALREADY_EXIST);
        }
      }

      const userTimezone = moment.tz.guess();
      if (email) existUser.email = email;
      if (first_name) existUser.first_name = first_name;
      if (last_name) existUser.last_name = last_name;
      if (birthday) existUser.birthday = moment(birthday).format('YYYY-MM-DD');
      if (is_sent != null) existUser.is_sent = is_sent;
      existUser.timezone = userTimezone;

      await this.userRepository.save(existUser);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const existUser = await this.userRepository.findById(id);
      if (!existUser) throw new NotFoundError(ERROR_MESSAGES.DATA_NOT_FOUND);

      await this.userRepository.deleteById(id);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getUsersForBirthdayCheck(currentDate: string): Promise<UserEntity[]> {
    return this.userRepository.findUsersByBirthday(currentDate);
  }

  async getUsersWithUnsentBirthdayMessage(
    currentDate: string,
  ): Promise<UserEntity[]> {
    return this.userRepository.getUsersWithUnsentBirthdayMessage(currentDate);
  }

  async markBirthdayMessageAsSent(userId: number): Promise<void> {
    await this.userRepository.updateBirthdayMessageStatus(userId, true);
  }

  async resetAllStatusMessages(): Promise<void> {
    await this.userRepository.resetAllStatusMessages();
  }
}
