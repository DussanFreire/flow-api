import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  Matches,
} from 'class-validator';

export class CustomerDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @IsNotEmpty()
  @IsString()
  dob: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
