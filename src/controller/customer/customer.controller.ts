import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AuthUser } from 'src/decorator/user.decorator';
import { CustomerFlowDto } from 'src/dto/dto_flow/customer.flow.dto';
import { ForgotPassword } from 'src/dto/dto_magento/forgot.password.magento.dto';
import { ResetPassword } from 'src/dto/dto_magento/reset.password.magento.dto';
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
  @Put('password')
  async forgotPassword(@Body() infoEmail:ForgotPassword) {
    return await this.customerService.forgotPassword(infoEmail);
  }
  @Post('reset-password')
  async resetPassword(@Body() infoEmail:ResetPassword) {
    return await this.customerService.resetPassword(infoEmail);
  }
}
