import { Request } from 'express';
import { User } from '@/Interface/user.interface';

export interface AuthenticatedRequest extends Request {
  user: User;
}
