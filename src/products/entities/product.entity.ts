import { FileEntity } from '../../files/entities/file.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => FileEntity, (file) => file.product, { cascade: true })
  files!: FileEntity[];
}
