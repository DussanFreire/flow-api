import { IsString, IsNumber } from 'class-validator';

export class CartPatchProductFlowDto {
  @IsNumber()
  qty: number;
  @IsString()
  quote_id: string;
}
