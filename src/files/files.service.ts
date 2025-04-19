import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { S3Service } from 'src/aws/services/s3.service';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly s3Service: S3Service,
  ) {}

  async uploadFiles(files: Express.Multer.File[], product: Product) {
    const uploadedFileEntities = await Promise.all(
      files.map(async (file) => {
        const fileName = file.originalname.split('.').slice(0, -1).join('.');
        const result = await this.s3Service.upload(file, fileName);
        return this.filesRepository.save(
          fileName,
          result.Location,
          result.Key,
          result.Bucket,
          product,
        );
      }),
    );
    return uploadedFileEntities;
  }

  async getFile(fileId: number) {
    const file = await this.filesRepository.findOne(fileId);
    if (!file) {
      throw new Error(`File with ID ${fileId} not found`);
    }

    const protectedLink = await this.s3Service.getProtectedLink(
      file.key!,
      file.bucket,
    );
    return {
      ...file,
      url: protectedLink,
    };
  }
}
