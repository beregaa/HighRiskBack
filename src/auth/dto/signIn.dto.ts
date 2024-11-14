import { IsString } from 'class-validator';

export class signInDto {
  @IsString()
  email: string;
  
  @IsString()
  password: string;
}
