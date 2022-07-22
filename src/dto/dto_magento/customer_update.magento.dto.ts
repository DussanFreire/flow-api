import { CustomerUpdateInfoDtoMagento } from './customer_update_info.magento.dto';

export class CustomerUpdateDtoMagento {
  customer: CustomerUpdateInfoDtoMagento;

  constructor(customer: CustomerUpdateInfoDtoMagento) {
    this.customer = customer;
  }
}
