import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPositive, IsString, Matches, MaxLength, MinLength } from "class-validator";
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
    @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email of the user', example: 'john@email.com' })
    email: string;
  
  @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: 'Age of the user', example: 25 })
  age: number;
  @ApiProperty({ description: 'Role of the user', example: 'admin' })
  role: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/, {
    message: 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
    @ApiProperty({ description: 'Password of the user', example: 'P@ssw0rd' })
  password: string;
}