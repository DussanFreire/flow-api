import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AuthUser } from '../../decorator/user.decorator';
import { CustomerFlowDto } from '../../dto/dto_flow/customer/customer.flow.dto';
import { CustomerService } from '../../service/customer/customer.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ForgotPassword } from 'src/dto/dto_magento/forgot.password.magento.dto';
import { ResetPassword } from 'src/dto/dto_magento/reset.password.magento.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Post()
  @ApiOperation({summary: 'Create Customer.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  @ApiBody({type: CustomerFlowDto})
  async createCustomer(@Body() customerDto: CustomerFlowDto) {
    return await this.customerService.createCustomer(customerDto);
  }
  
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({summary: 'Get basic info.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
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
