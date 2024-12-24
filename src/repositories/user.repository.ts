import { Raw, Repository } from 'typeorm';
import { AppDataSource } from '../config/database.config';
import { UserEntity } from '../entities/user.entity';

export class UserRepository {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  async save(payload: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(payload);
  }

  async findById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findUsersByBirthday(currentDate: string): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: {
        birthday: Raw((alias) => `TO_CHAR(${alias}, 'MM-DD') = :currentDate`, {
          currentDate,
        }),
        is_sent: false,
      },
    });
  }

  async getUsersWithUnsentBirthdayMessage(
    currentDate: string,
  ): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: {
        birthday: Raw((alias) => `TO_CHAR(${alias}, 'MM-DD') <= :currentDate`, {
          currentDate,
        }),
        is_sent: false,
      },
    });
  }

  async updateBirthdayMessageStatus(
    userId: number,
    status: boolean,
  ): Promise<void> {
    await this.userRepository.update(userId, { is_sent: status });
  }

  async resetAllStatusMessages(): Promise<void> {
    await this.userRepository.update({}, { is_sent: false });
  }
}
