import { ShippingBillingInfoDto } from './shipping_billingInfo.dto';

export class AddressInformationDto {
  shipping_address: ShippingBillingInfoDto;
  billing_address: ShippingBillingInfoDto;
  shipping_carrier_code: String;
  shipping_method_code: String;

  constructor(
    shippingAddress: ShippingBillingInfoDto,
    shippingCarrierCode: String,
    shippingMethodCode: String,
  ) {
    this.shipping_address = shippingAddress;
    this.billing_address = shippingAddress;
    this.shipping_carrier_code = shippingCarrierCode;
    this.shipping_method_code = shippingMethodCode;
  }
}
