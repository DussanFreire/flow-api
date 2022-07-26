import { Type } from 'class-transformer';
import { IsNotEmpty, isNotEmpty, IsObject, IsOptional } from 'class-validator';
class custom_attributes{
  attribute_code: string;
  value: string;
}
class ShippingBillingInfoDto {
  region_code: string;
  region: string;
  region_id: number;
  country_id: String;
  street: string[];
  postcode: string;
  city: string;
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  default_shipping: boolean;
  @Type(() => custom_attributes)
  custom_attributes: custom_attributes[];
}

class AddressInformationDto {
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

export class CartShippingInformationDto {
  @IsObject()
  @Type(() => AddressInformationDto)
  addressInformation: AddressInformationDto;

  constructor(addressInformation: AddressInformationDto) {
    this.addressInformation = addressInformation;
  }
}
