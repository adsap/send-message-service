import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsTimeZone,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birthday!: Date;
}

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthday?: Date;

  @IsBoolean()
  @IsOptional()
  is_sent?: boolean;

  @IsString()
  @IsTimeZone()
  @IsOptional()
  timezone?: string;
}
