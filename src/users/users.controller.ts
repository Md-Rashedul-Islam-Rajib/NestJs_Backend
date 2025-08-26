import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public getAllUsers() {
    return 'List of all users';
  }
  // use '/:id' for catching param and '/:id?' for optional param

  @Get(':id')
    public getUserById(@Param('id') id?: string,
        @Query('role') role?: string,
        @Query('age') age?: number) {
      if(id){
return `User with id: ${id}`;
      }
      if(role){return `Users with role: ${role}`;}
     if(age){return `Users with age: ${age}`;}
      return 'No id provided';
    
  }

  @Post()
  public createUsers(@Body() requestBody: { name: string; age: number; role: string }) {
    console.log(requestBody);
      return 'Create user';
  }
}
