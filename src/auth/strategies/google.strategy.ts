import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  VerifyCallback,
  StrategyOptions,
} from 'passport-google-oauth20';
import googleOauthConfig from '../config/google-oauth.config';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Gender } from '../../users/enums/user-gender.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
  ) {
    const { clientId, clientSecret, callbackUrl } = googleConfiguration;

    if (!clientId || !clientSecret || !callbackUrl) {
      throw new Error('Google OAuth configuration is missing critical values.');
    }

    super(<StrategyOptions>{
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    console.log({ profile });
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      password: '',
      username: '',
      gender: Gender.MALE,
      confirmPassword: '',
      termsAccepted: false,
      phoneNumber: '',
    });
    return user;
  }
}
