import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CartPatchProductFlowDto {
  @IsNumber()
  @ApiProperty({type:Number,description:'Quantity'})
  qty: number;
  @IsString()
  @ApiProperty({type:String,description:'Cart Id'})
  quote_id: string;
}
