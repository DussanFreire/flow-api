import { IsNotEmpty, IsString } from 'class-validator';

export class LoginMagentoDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
