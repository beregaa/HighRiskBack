import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signIn.dto';
import { GuestGuard } from './gurds/guest.gurd';

@Controller('auth')
@UseGuards(GuestGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser(@Body() signInDto: signInDto) {
    return this.authService.logInUser(signInDto);
  }
}
