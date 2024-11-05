import { IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(6)
  @IsNotEmpty()
  password: string;

}

export class UpdateUserDTO {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  @Length(6)
  password: string;

}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
