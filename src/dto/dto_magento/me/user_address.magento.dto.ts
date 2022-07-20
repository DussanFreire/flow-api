import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class RegionDto {
  @ApiProperty({type: String})
  region_code: string;
  @ApiProperty({type: String})
  region: string;
  @ApiProperty({type: Number})
  region_id: number;
}
class custom_attributes{
  @ApiProperty({type: String})
  attribute_code: string;
  @ApiProperty({type: String})
  value: string;
}
export class UserAddressMagentoDto {
  id: number;
  @IsObject()
  @Type(() => RegionDto)
  @ApiProperty({type: RegionDto})
  region: RegionDto;
  @IsNotEmpty()
  @ApiProperty({type: String})
  country_id: string;
  @IsNotEmpty()
  @ApiProperty({type:[String]})
  street: string[];
  @IsNotEmpty()
  @ApiProperty({type: String})
  postcode: string;
  @IsNotEmpty()
  @ApiProperty({type: String})
  city: string;
  @IsNotEmpty()
  @ApiProperty({type: String})
  firstname: string;
  @IsNotEmpty()
  @ApiProperty({type: String})
  lastname: string;
  @IsNotEmpty()
  @ApiProperty({type: String})
  telephone: string;
  @IsNotEmpty()
  @ApiProperty({type: Boolean})
  default_shipping: boolean;
  @IsNotEmpty()
  @ApiProperty({type: Boolean})
  default_billing: boolean;
  @IsNotEmpty()
  @ApiProperty({type: [custom_attributes]})
  @Type(() => custom_attributes)
  custom_attributes: custom_attributes[];
}
