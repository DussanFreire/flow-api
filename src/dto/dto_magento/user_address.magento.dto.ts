export class UserAddressMagentoDto {
  id: number;
  customer_id: number;
  region: {
    region_code: string;
    region: string;
    region_id: number;
  };
  region_id: number;
  country_id: string;
  street: [string, string];
  telephone: number;
  postcode: number;
  city: string;
  firstname: string;
  lastname: string;
  default_shipping: boolean;
  custom_attributes: Array<{
    attribute_code: string;
    value: string;
  }>;
}
