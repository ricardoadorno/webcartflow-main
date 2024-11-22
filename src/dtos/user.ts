import { IsString, Length, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

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


export class CreateRatingDto {

  @IsNotEmpty()
  @Min(1)
  @Max(5)
  @IsInt()
  rate: number

  @IsNotEmpty()
  product_id: number

  @IsString()
  comment: string;

}