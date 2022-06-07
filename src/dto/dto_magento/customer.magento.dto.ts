import { IsNotEmpty, IsString } from 'class-validator';

export class CustomerMagentoDto {
  @IsNotEmpty()
  @IsString()
  customer: {
    email: string;
    firstname: string;
    lastname: string;
    dob: string;
  };
  @IsNotEmpty()
  @IsString()
  password: string;
}
