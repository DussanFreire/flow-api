import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CartMagentoDto {
  @IsString()
  @ApiProperty({type:String,description:'Stock-keeping unit'})
  sku: string;
  @IsNumber()
  @ApiProperty({type: Number,description:'Quantity'})
  qty: number;
  @IsString()
  @ApiProperty({type:String,description:'Cart Id'})
  quote_id: string;
}
