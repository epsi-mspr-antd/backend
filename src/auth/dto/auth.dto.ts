import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  pseudo: string;
}

export class AuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export const createAuthDtoExample: CreateAuthDto = {
  email: 'johndoe@example.com',
  password: 'password123',
  pseudo: 'pseudo',
};

export const authDtoExample: AuthDto = {
  email: 'johndoe@example.com',
  password: 'password123',
};
