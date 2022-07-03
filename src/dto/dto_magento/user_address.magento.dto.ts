import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject } from 'class-validator';

class RegionDto {
  region_code: String;
  region: String;
  region_id: number;
}

export class UserAddressMagentoDto {
  @IsObject()
  @Type(() => RegionDto)
  region: RegionDto;
  @IsNotEmpty()
  country_id: String;
  @IsNotEmpty()
  street: [String, String];
  @IsNotEmpty()
  postcode: number;
  @IsNotEmpty()
  city: String;
  @IsNotEmpty()
  firstname: String;
  @IsNotEmpty()
  lastname: String;
  @IsNotEmpty()
  telephone: string;
  @IsNotEmpty()
  default_shipping: boolean;
  @IsNotEmpty()
  default_billing: boolean;
  @IsNotEmpty()
  custom_attributes: [
    {
      attribute_code: String;
      value: String;
    },
  ];
}
