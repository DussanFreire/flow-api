import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthUser } from 'src/decorator/user.decorator';
import { CustomerFlowDto } from 'src/dto/dto_flow/customer.flow.dto';
import { CustomerService } from 'src/service/customer/customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Post()
  async createCustomer(@Body() customerDto: CustomerFlowDto) {
    return await this.customerService.createCustomer(customerDto);
  }
  @Get('me')
  async getInfo(@AuthUser() token: any) {
    return await this.customerService.getInfo(token);
  }
}
