export class UserAddressMagentoDto {
  id: number;
  customer_id: number;
  region: {
    region_code: String;
    region: String;
    region_id: number;
  };
  region_id: number;
  country_id: String;
  street: [String, String];
  telephone: number;
  postcode: number;
  city: String;
  firstname: String;
  lastname: String;
  default_shipping: boolean;
  custom_attributes: [
    {
      attribute_code: String;
      value: String;
    },
  ];
}
