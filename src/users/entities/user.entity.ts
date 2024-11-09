import { Type } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: 0 })
  numberOfAttempts: number;

  @Type(() => Date)
  @Column({ type: 'timestamp', nullable: true, default: null })
  userBlockedUntil: Date;
}
