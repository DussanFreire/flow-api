import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CustomerFlowDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsString()
  dob: string;
  @IsOptional()
  @IsString()
  password: string;

  constructor(email: string, firstName: string, lastName: string, dob: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
  }
}
