import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsString } from 'class-validator';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsString()
  email!: string;

  @Column()
  @IsString()
  first_name!: string;

  @Column()
  @IsString()
  last_name!: string;

  @Column('date')
  @IsDate()
  birthday!: string;

  @Column()
  @IsString()
  timezone!: string;

  @Column({ default: false })
  is_sent!: boolean;
}
