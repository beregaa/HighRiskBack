import { Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
  Gender: Gender;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ default: 0 })
  numberOfAttempts: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Type(() => Date)
  @Column({ type: 'timestamp', nullable: true, default: null })
  userBlockedUntil: Date;

  @Type(() => Date)
  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;
}
