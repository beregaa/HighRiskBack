import {
  IsEmail,
  IsNumber,
  IsString,
  Length,
  IsPositive,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;

  @IsString()
  @Length(8, 20)
  confirmPassword: string;
}
