import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class GuestGuard implements CanActivate {
  constructor() {}

   canActivate() {
   
    return true;
  }

 
}
