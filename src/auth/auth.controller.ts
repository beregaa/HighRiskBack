import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  loginUser(@Body() data: loginUserDto) {
    return this.authService.logInUser(data);
  }
}
