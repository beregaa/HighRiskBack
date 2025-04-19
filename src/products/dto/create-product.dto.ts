import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { Express } from 'express';  // Make sure to import Express if not already

export class CreateProductDto {
  @IsString()
  name!: string;

  files!: Express.Multer.File[];
}
