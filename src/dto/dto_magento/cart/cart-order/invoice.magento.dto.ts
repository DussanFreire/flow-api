import { IsNotEmpty, IsString } from 'class-validator';

export class InvoiceMagentoDto {
  @IsNotEmpty()
  @IsString()
  invoice_id: string;
}
