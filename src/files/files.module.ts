import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesRepository } from './files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), AwsModule],
  providers: [FilesService, FilesRepository],
  exports: [FilesService],
})
export class FilesModule {}
