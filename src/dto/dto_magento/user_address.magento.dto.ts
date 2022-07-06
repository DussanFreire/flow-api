import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject } from 'class-validator';

class RegionDto {
  region_code: string;
  region: string;
  region_id: number;
}

export class UserAddressMagentoDto {
  @IsNotEmpty()
  id: number;
  @IsObject()
  @Type(() => RegionDto)
  region: RegionDto;
  @IsNotEmpty()
  country_id: string;
  @IsNotEmpty()
  street: [string, string];
  @IsNotEmpty()
  postcode: number;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  telephone: string;
  @IsNotEmpty()
  default_shipping: boolean;
  @IsNotEmpty()
  default_billing: boolean;
  @IsNotEmpty()
  custom_attributes: [
    {
      attribute_code: string;
      value: string;
    },
  ];
}
