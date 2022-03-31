import { IsNotEmpty, IsString } from 'class-validator';

export class TokenMagentoDto {
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
