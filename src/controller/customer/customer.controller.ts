import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthUser } from '../../decorator/user.decorator';
import { CustomerFlowDto } from '../../dto/dto_flow/customer/customer.flow.dto';
import { CustomerService } from '../../service/customer/customer.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

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
}
