import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProduces, ApiProperty } from '@nestjs/swagger';

export class CustomerFlowDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({type:String, description:'Email'})
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({type:String, description:'First Name'})
  firstName: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({type:String, description:'Last Name'})
  lastName: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({type:String, description:'Day of Birth'})
  dob: string;
  @IsOptional()
  @IsString()
  @ApiProperty({type:String, description:'Password'})
  password: string;

  constructor(email: string, firstName: string, lastName: string, dob: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
  }
}
