import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderFlowDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({type: String})
  shipping_carrier_code: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({type: String})
  shipping_method_code: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({type: String})
  payment_method: string;
  @IsNotEmpty()
  @ApiProperty({type: String})
  address_id: string;
}
