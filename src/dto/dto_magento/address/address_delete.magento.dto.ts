import { IsBoolean, IsNotEmpty } from 'class-validator';

export class AddressDeleteMagentoDto {
  @IsNotEmpty()
  @IsBoolean()
  response: boolean;
}
