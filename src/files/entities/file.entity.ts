import { Product } from '../../products/entities/product.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'files' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url?: string;

  @Column()
  key!: string;

  @Column()
  bucket!: string;

  @Column()
  fileName!: string;

  @ManyToOne(() => Product, (product) => product.files, { onDelete: 'CASCADE' })
  product!: Product;
}
