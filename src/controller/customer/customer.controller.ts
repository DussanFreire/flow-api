import { Body, Controller, Post } from '@nestjs/common';
import { CustomerFlowDto } from 'src/dto/dto_flow/customer.flow.dto';
import { CustomerService } from 'src/service/register/customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Post()
  async createCustomer(@Body() customerDto: CustomerFlowDto) {
    return await this.customerService.createCustomer(customerDto);
  }
}
