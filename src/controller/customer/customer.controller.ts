import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthUser } from '../../decorator/user.decorator';
import { CustomerFlowDto } from '../../dto/dto_flow/customer/customer.flow.dto';
import { CustomerService } from '../../service/customer/customer.service';

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
