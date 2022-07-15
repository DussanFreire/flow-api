import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject } from 'class-validator';

class RegionDto {
  region_code: string;
  region: string;
  region_id: number;
}
class custom_attributes{
  attribute_code: string;
  value: string;
}
export class UserAddressMagentoDto {
  id: number;
  @IsObject()
  @Type(() => RegionDto)
  region: RegionDto;
  @IsNotEmpty()
  country_id: string;
  @IsNotEmpty()
  street: string[];
  @IsNotEmpty()
  postcode: string;
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
  @Type(() => custom_attributes)
  custom_attributes: custom_attributes[];
}
