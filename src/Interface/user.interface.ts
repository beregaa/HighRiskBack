import { Gender } from "aws-sdk/clients/polly";
import { UserRole } from "aws-sdk/clients/workmail";

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
