import { Gender } from '@/users/enums/user-gender.enum';
import { UserRole } from '@/users/enums/user-role.enum';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender?: Gender;
  role?: UserRole;
  numberOfAttempts: number;
  createdAt?: Date;
  updatedAt?: Date;
  userBlockedUntil: Date | null;
  lastLogin?: Date;
}
