import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { MimeType } from 'aws-sdk/clients/kendra';

@Injectable()
export class S3Service {
  private s3Client: AWS.S3;

  constructor() {
    this.s3Client = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'eu-north-1',
      signatureVersion: 'v4',
    });
  }
  async upload(file: Express.Multer.File, Key: string) {
    const buffer = file.buffer;

    const params = {
      Bucket: String(process.env.AWS_BUCKET_NAME),
      Key: String(Key),
      Body: buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'eu-north-1',
      },
    };

    try {
      return await this.s3Client.upload(params).promise();
    } catch (e) {
      console.log('Could not upload file to s3', { e, name, MimeType });
      throw e;
    }
  }

  async getProtectedLink(Key: string ,bucket:string) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: Key,
      Expires: 3600,
    };

    try {
      const url = await this.s3Client.getSignedUrlPromise('getObject', params);
      return url;
    } catch (error) {
      const err = error as Error;
      console.log(`Failed to get presigned URL for key ${Key}`, err.stack);
    }
  }
}
