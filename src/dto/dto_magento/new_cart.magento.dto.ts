import { IsNotEmpty, IsString } from 'class-validator';

export class NewCartMagentoDto {
  @IsNotEmpty()
  @IsString()
  cart_id: string;
}
