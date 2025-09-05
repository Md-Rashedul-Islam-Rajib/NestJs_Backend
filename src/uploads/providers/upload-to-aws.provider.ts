/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
    constructor(
        private readonly configService: ConfigService
    ){}

    public async fileUploadToAWS(file: Express.Multer.File) {
        try {
        const s3 = new S3();
        const result = await s3
          .upload({
            Bucket: this.configService.get('appConfig.awsBucketName'),
            Body: file.buffer,
            Key: this.generateFileName(file),
            ContentType: file.mimetype,
          })
          .promise();

        return result.Key;
            
        } catch (error) {
            throw new RequestTimeoutException(error)
        }
        
    }
    
    private generateFileName(file: Express.Multer.File) {
        const name = file.originalname.split('.')[0];
        name.replace(/\s/g, '').trim();
        const extension = path.extname(file.originalname)
        const timeStamp = new Date().getTime().toString().trim();

        return `${name}-${timeStamp}-${uuid()}${extension}`
    }
}
