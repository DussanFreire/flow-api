import { UserAddressMagentoDto } from "./user_address.magento.dto";

export class UserInfoMagento {
        customer: {
                email: string;
                firstname: string;
                lastname: string;
                website_id: number;
                addresses: UserAddressMagentoDto[];
        }
}
