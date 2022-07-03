import { Type } from "class-transformer";
import { IsNotEmpty, isNotEmpty, IsObject, IsOptional } from "class-validator"

export class ShippingBillingInfoDto{
    region_code:String;
    region:String;
    region_id:number;
    country_id:String;
    street:[String,String];
    postcode: number;
    city: String;
    firstname: String;
    lastname: String;
    email:string;
    telephone:string;
    default_shipping: boolean;
    custom_attributes: [
        {
        attribute_code: String;
        value: String;
        },
    ]
}

class AddressInformationDto {
    shipping_address: ShippingBillingInfoDto;
    billing_address: ShippingBillingInfoDto;
    shipping_carrier_code: String;
    shipping_method_code: String;
}

export class CartShippingInformationDto{
    @IsObject()
    @Type(() => AddressInformationDto)
    addressInformation: AddressInformationDto;
}