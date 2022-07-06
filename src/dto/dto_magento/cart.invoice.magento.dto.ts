import { IsBoolean, IsNotEmpty } from 'class-validator';

export class InvoiceDto {
  @IsNotEmpty()
  @IsBoolean()
  capture: Boolean;
  @IsNotEmpty()
  @IsBoolean()
  notify: Boolean;

  constructor() {
    this.capture = true;
    this.notify = true;
  }
}
