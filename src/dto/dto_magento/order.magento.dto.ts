import { IsNotEmpty, IsString } from 'class-validator';

export class OrderMagentoDto {
  @IsNotEmpty()
  @IsString()
  order_id: string;
}
