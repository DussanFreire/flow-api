import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CartFlowProductDto {
  @IsNumber()
  item_id: number;
  @IsString()
  sku: string;
  @IsNumber()
  qty: number;
  @IsString()
  quote_id: string;
  @IsNumber()
  price: number;
}
