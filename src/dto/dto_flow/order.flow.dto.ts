import { IsNotEmpty, IsString } from 'class-validator';

export class OrderFlowDto {
  @IsNotEmpty()
  @IsString()
  shipping_carrier_code: string;
  @IsNotEmpty()
  @IsString()
  shipping_method_code: string;
  @IsNotEmpty()
  @IsString()
  payment_method: string;
  @IsNotEmpty()
  address_id: string;
}
