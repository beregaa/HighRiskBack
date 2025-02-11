// import { Injectable } from '@nestjs/common';
// import * as AWS from 'aws-sdk';
// import { MimeType } from 'aws-sdk/clients/kendra';

// @Injectable()
// export class S3Service {
//   private s3Client: AWS.S3;

//   constructor() {
//     this.s3Client = new AWS.S3({
//       accessKeyId: process.env.AWS_ACCESS_KEY,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//       region: 'eu-north-1',
//       signatureVersion: 'v4',
//     });
//   }
//   async upload(file: Express.Multer.File, key: string) {
//     const buffer = file.buffer;

//     const params = {
//       Bucket: 'reverse-products',
//       Key: String(key),
//       Body: buffer,
//       ContentType: file.mimetype,
//       ContentDisposition: 'inline',
//       CreateBucketConfiguration: {
//         LocationConstraint: 'eu-north-1',
//       },
//     };

//     try {
//       return await this.s3Client.upload(params).promise();
//     } catch (e) {
//       console.log('Could not upload file to s3', { e, name, MimeType });
//       throw e;
//     }
//   }
// }
