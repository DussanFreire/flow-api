import { Type } from "class-transformer";
import { IsNotEmpty, IsObject } from 'class-validator';

class custom_attributes{
  attribute_code: string;
  value: string;
}
export class ShippingBillingInfoDto {
  region_code: string;
  region: string;
  region_id: number;
  country_id: string;
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
