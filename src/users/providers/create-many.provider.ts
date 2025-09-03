import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateManyUserDto } from '../dtos/create-many-users.dto';

@Injectable()
export class CreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}
  public async createMany(createManyUserDto: CreateManyUserDto) {
    const users: User[] = [];

    //create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    // connect it to datasource
    await queryRunner.connect();

    // start transaction
    await queryRunner.startTransaction();
    try {
      for (const user of createManyUserDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        users.push(result);
      }
      // successful commit
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return users;
  }
}
