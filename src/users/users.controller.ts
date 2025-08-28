import { Body, Controller, DefaultValuePipe, Get, Headers, Ip, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { GetUserParamsDto } from './dtos/getUserParams.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, // dependency injection
  ){}
  
  @Get()
  public getAllUsers(@Query() params: GetUserParamsDto) {
    const limit: number = params.limit ? params.limit : 10;
    const page: number = params.page ? params.page : 1;
    return this.usersService.findAllUsers(params, limit, page);
  }
  

  @Get(':id')
  public getUserById(
    @Param('id') id?: string,
    @Query('role') role?: string,
    @Query('age') age?: number,
    // using DefaultValuePipe to set default value if no value is provided in query
    // using ParseIntPipe to convert string to number
    @Query('limit', new DefaultValuePipe(10),ParseIntPipe) limit?: number,
    @Query('offset') offset?: number,
    @Query('page',new DefaultValuePipe(1),ParseIntPipe) page?: number,
  ) {
    console.log({ limit, offset, page });
    if (id) {
      return `User with id: ${id}`;
    }
    if (role) {
      return `Users with role: ${role}`;
    }
    if (age) {
      return `Users with age: ${age}`;
    }
    return 'No id provided';
  }

  @Post()

  // using @body decorator to get the whole body
  public createUsers(
    // using ValidationPipe to validate the request body based on the dto class-validator decorators and use the createUserDto class to type as type the request body
    @Body() requestBody: CreateUserDto,
  ) {
    console.log(requestBody);
    return 'Create user';
  }

  @Post()

      // using @Req decorator for using express request to get the whole body
       // ! not recommended, unless you need something specific from express like alter the request what not possible with nestjs 
  public createUserProfile(
    @Req() requestBody: Request,
    @Headers() headers: any,
    @Ip() ip: string,
  ) {
    console.log(ip);
    console.log(headers);
    console.log(requestBody);
    return 'Create user profile';
  }

  @Patch()
  public updateUser(
     @Body() body: PatchUserDto
  ) {
   console.log(body);
    return body;
  }
}
