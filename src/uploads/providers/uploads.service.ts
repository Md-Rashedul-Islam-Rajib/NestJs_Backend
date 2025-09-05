/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { fileTypes } from '../enums/file-types.enum';
import { UploadFile } from '../interfaces/upload-file.interface';
import { Upload } from '../upload.entity';
import { UploadToAwsProvider } from './upload-to-aws.provider';

@Injectable()
export class UploadsService {
  constructor(
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    private readonly configService: ConfigService,
    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>,
  ) {}

  public async uploadFile(file: Express.Multer.File) {
    if (
      ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('Mime type not supported');
      }
      
      try {
    const path = await this.uploadToAwsProvider.fileUploadToAWS(file);
    const uploadFile: UploadFile = {
      name: file.originalname,
      path: `https://${this.configService.get('appConfig.awsCloudFrontUrl')}/${file.originalname}`,
      type: fileTypes.IMAGE,
      mime: file.mimetype,
      size: file.size,
    };
     this.uploadsRepository.create(uploadFile);
    return await this.uploadsRepository.save(uploadFile);    
      } catch (error) {
        throw new ConflictException(error)
      }
    
  }
}
