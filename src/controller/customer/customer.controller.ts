import { Body, Controller, Post } from '@nestjs/common';
import { CustomerDto } from 'src/dto/customer.dto';
import { CustomerService } from 'src/service/register/customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Post()
  async createCustomer(@Body() customerDto: CustomerDto) {
    return this.customerService.createCustomer(customerDto);
  }
}
