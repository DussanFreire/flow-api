import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthUser } from '../../decorator/user.decorator';
import { UserAddressMagentoDto } from '../../dto/dto_magento/me/user_address.magento.dto';
import { AddressService } from '../../service/address/address.service';
import { MeService } from '../../service/me/me.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OrderService } from '../../service/order/order.service';
import { AddressDeleteMagentoDto } from '../../dto/dto_magento/address/address_delete.magento.dto';
import { UserOrdersMagentoDto } from '../../dto/dto_magento/order/user_orders.magento.dto';
import { CustomerUpdateInfoDtoFlow } from '../../dto/dto_flow/customer/customer_update_info.flow.dto';

@ApiTags('Me')
@ApiBearerAuth()
@Controller('me')
export class MeController {
  constructor(
    private meService: MeService,
    private addressService: AddressService,
    private orderService: OrderService,
  ) {}

  @Get()
  @ApiOperation({summary: 'Get login info.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async getAllUserInfo(@AuthUser() user: any) {
    return await this.meService.getLoginInfo(user);
  }

  @Get('/addresses')
  @ApiOperation({summary: 'Get addresses of a customer.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async getUserAddressesInBolivia(@AuthUser() user: any) {
    return await this.addressService.getUserAddressesInBolivia(user);
  }

  @Post('/addresses')
  @ApiOperation({summary: 'Add a new address.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  @ApiBody({type: UserAddressMagentoDto})
  async addNewAddres(@AuthUser() user: any, @Body() address: UserAddressMagentoDto) {
    return await this.addressService.addNewAddress(user, address);
  }

  @Get('/user-info')
  @ApiOperation({summary: 'Get info of a user.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async getUserInfo(@AuthUser() user: any) {
    return await this.meService.getUserId(user);
  }

  @Put()
  @ApiOperation({summary: 'Update user info.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  @ApiBody({type: CustomerUpdateInfoDtoFlow})
  async updateUserInfo(@AuthUser() user: any, @Body() userUpdates: CustomerUpdateInfoDtoFlow) {
    return await this.meService.updateUserInfo(user, userUpdates);
  }

  @Put('/addresses/:id')
  @ApiOperation({summary: 'Update user addresses.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  @ApiBody({type: UserAddressMagentoDto})
  async updateAddress(
    @AuthUser() user: any,
    @Body() address: UserAddressMagentoDto,
    @Param('id') id: string,
  ) {
    const updatedAddress: UserAddressMagentoDto =
      await this.addressService.updateAddress(user, address, id);
    return updatedAddress;
  }

  @Delete('/addresses/:id')
  @ApiOperation({summary: 'Delete addresses.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async deleteAddress(
    @AuthUser() user: any,
    @Param('id') id: string,
  ): Promise<AddressDeleteMagentoDto> {
    return await this.addressService.deleteAddressById(user, id);
  }

  @Get('/orders')
  @ApiOperation({summary: 'Get user Orders.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async getUserOrders(@AuthUser() user: any): Promise<UserOrdersMagentoDto> {
    return await this.orderService.getUserOrders(user);
  }
}
