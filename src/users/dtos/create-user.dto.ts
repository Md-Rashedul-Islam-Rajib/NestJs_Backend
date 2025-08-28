import { IsEmail, IsNotEmpty, IsPositive, IsString, Matches, MaxLength, MinLength } from "class-validator";
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
    email: string;
  
  @IsPositive()
  age: number;
  
  role: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/, {
    message: 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;
}