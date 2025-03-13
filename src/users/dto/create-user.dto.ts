import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  nif: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty() 
  @IsEnum(['CLIENT', 'PROVIDER'])
  role: 'CLIENT' | 'PROVIDER'; 

  @IsOptional()
  balance?: number; 
}
