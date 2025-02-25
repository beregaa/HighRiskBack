import {
  IsEmail,
  IsString,
  Length,
  IsBoolean,
  IsPhoneNumber,
  Validate,
  IsEnum,
} from 'class-validator';
import { Gender } from '../enums/user-gender.enum';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  username!: string;

  @IsEmail()
  email!: string;
  
  @IsEnum(Gender)
  gender!: Gender;

  @IsString()
  @Length(8, 20)
  password!: string;

  @IsString()
  @Length(8, 20)
  confirmPassword!: string;

  @IsBoolean()
  termsAccepted!: boolean;

  @IsPhoneNumber('GE')
  phoneNumber!: string;
}
