import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class signInDto {
  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsBoolean()
  @IsOptional()
  googleAuth?: boolean = false;
}
