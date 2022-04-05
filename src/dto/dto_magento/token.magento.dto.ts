import { IsNotEmpty, IsString } from 'class-validator';

export class TokenMagentoDto {
  token: Array<object>;

  constructor(token: Array<object>) {
    this.token = token;
  }
}
