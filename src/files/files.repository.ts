// import { Injectable } from '@nestjs/common';
// import { CreateFileDto } from './dto/create-file.dto';
// import { UpdateFileDto } from './dto/update-file.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { FileEntity } from './entities/file.entity';
// import { Repository } from 'typeorm';
// // import { S3Service } from 'src/aws/services/s3.service';

// @Injectable()
// export class FilesRepository {
//   constructor(
//     @InjectRepository(FileEntity)
//     private readonly fileReposiotry: Repository<FileEntity>,
//     // private readonly s3Service: S3Service,
//   ) {}

//   async save(name: string, url: string, key: string, bucket: string) {
//     const newFile = new FileEntity();

//     newFile.fileName = name;
//     newFile.url = url;
//     newFile.key = key;
//     newFile.bucket = bucket;

//     // await this.s3Service.upload()

//     return await this.fileReposiotry.save(newFile);
//   }
// }
