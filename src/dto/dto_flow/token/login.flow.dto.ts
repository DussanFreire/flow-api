import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProduces, ApiProperty } from '@nestjs/swagger';

export class LoginFlowDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({type:String})
  username: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({type:String})
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
