import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject } from 'class-validator';
import { ShippingBillingInfoDto } from './shipping_billingInfo.dto';

class Payment {
  @IsNotEmpty()
  method: string;
}

export class PaymentInformationDto {
  @IsNotEmpty()
  @IsObject()
  @Type(() => Payment)
  payment_method: Payment;
  @IsNotEmpty()
  @IsObject()
  @Type(() => ShippingBillingInfoDto)
  billing_address: ShippingBillingInfoDto;

  constructor(billingAdress: ShippingBillingInfoDto, paymentMethod: string) {
    this.billing_address = billingAdress;
    this.payment_method = new Payment();
    this.payment_method.method = paymentMethod;
  }
}
