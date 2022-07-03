import { Type } from "class-transformer";
import { IsNotEmpty, isNotEmpty, IsObject } from "class-validator";
import { ShippingBillingInfoDto } from "./cart.shipping-information.magento.dto";

class Payment{
    @IsNotEmpty()
    method:string;
}

export class PaymentInformationDto{
    @IsNotEmpty()
    @IsObject()
    @Type(() => Payment)
    paymentMethod:Payment;
    @IsNotEmpty()
    @IsObject()
    @Type(() => ShippingBillingInfoDto)
    billing_address:ShippingBillingInfoDto;
}