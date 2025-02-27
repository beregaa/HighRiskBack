import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signIn.dto';
import { GuestGuard } from './gurds/guest.gurd';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from 'src/Interface/AuthenticatedRequest';

@Controller('auth')
@UseGuards(GuestGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  loginUser(@Body() signInDto: signInDto) {
    return this.authService.logInUser(signInDto);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const response = await this.authService.logInUser({
      email: req.user.email,
      password: req.user.password,
      googleAuth: true,
    });

    res.redirect(`http://localhost:3000/?token=${response.accessToken}`);
  }
}
