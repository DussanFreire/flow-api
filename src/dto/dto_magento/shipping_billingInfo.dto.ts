export class ShippingBillingInfoDto {
  region_code: String;
  region: String;
  region_id: number;
  country_id: String;
  street: [String, String];
  postcode: number;
  city: String;
  firstname: String;
  lastname: String;
  email: string;
  telephone: string;
  default_shipping: boolean;
  custom_attributes: Array<{
    attribute_code: String;
    value: String;
  }>;
}
