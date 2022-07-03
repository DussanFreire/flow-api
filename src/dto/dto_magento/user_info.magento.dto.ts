import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { UserAddressMagentoDto } from "./user_address.magento.dto";
class Customer {
        @IsNotEmpty()
        email: string;
        @IsNotEmpty()
        firstname: string;
        @IsNotEmpty()
        lastname: string;
        @IsNotEmpty()
        website_id: number;
        @IsNotEmpty()
        addresses: UserAddressMagentoDto[];
}
export class UserInfoMagento {
        @IsNotEmpty()
        @Type(() => Customer)
        customer: Customer;
}