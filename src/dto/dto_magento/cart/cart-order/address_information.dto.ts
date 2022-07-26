import { ShippingBillingInfoDto } from './shipping_billingInfo.dto';

export class AddressInformationDto {
  shipping_address: ShippingBillingInfoDto;
  billing_address: ShippingBillingInfoDto;
  shipping_carrier_code: string;
  shipping_method_code: string;

  constructor(
    shippingAddress: ShippingBillingInfoDto,
    shippingCarrierCode: string,
    shippingMethodCode: string,
  ) {
    this.shipping_address = shippingAddress;
    this.billing_address = shippingAddress;
    this.shipping_carrier_code = shippingCarrierCode;
    this.shipping_method_code = shippingMethodCode;
  }
}
