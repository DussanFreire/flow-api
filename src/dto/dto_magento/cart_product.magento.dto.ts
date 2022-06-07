import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CartMagentoDto {
  @IsString()
  sku: string;
  @IsNumber()
  qty: number;
  @IsString()
  quote_id: string;
}
