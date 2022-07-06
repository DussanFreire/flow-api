import { Type } from 'class-transformer';
import { IsNotEmpty, isNotEmpty, IsObject, IsOptional } from 'class-validator';
import { AddressInformationDto } from './address_information.dto';

export class CartShippingInformationDto {
  @IsObject()
  @Type(() => AddressInformationDto)
  addressInformation: AddressInformationDto;

  constructor(addressInformation: AddressInformationDto) {
    this.addressInformation = addressInformation;
  }
}
