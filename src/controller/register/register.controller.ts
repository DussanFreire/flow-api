import { Body, Controller, Post } from '@nestjs/common';
import { CustomerDto } from 'src/dto/customer.dto';
import { RegisterService } from 'src/service/register/register.service';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}
  @Post('customer')
  async createCustomer(@Body() customerDto: CustomerDto) {
    return this.registerService.createCustomer(customerDto);
  }
}
