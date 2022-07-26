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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OrderService } from 'src/service/order/order.service';
import { AddressDeleteMagentoDto } from 'src/dto/dto_magento/address_delete.magento.dto';
import { UserOrdersMagentoDto } from 'src/dto/dto_magento/user_orders.magento.dto';

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
  async getUsegetLoginInforInfo(@AuthUser() user: any) {
    return await this.meService.getLoginInfo(user);
  }

  @Get('/user-info')
  async getUserInfo(@AuthUser() user: any) {
    return await this.meService.getUserId(user);
  }

  @Put()
  async updateUserInfo(@AuthUser() user: any, @Body() userUpdates: any) {
    return await this.meService.updateUserInfo(user, userUpdates);
  }

  @Get('/addresses')
  @ApiOperation({summary: 'Get addresses of a customer.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async getUserAddressesInBolivia(@AuthUser() user: any) {
    return await this.addressService.getUserAddressesInBolivia(user);
  }

  @Put('/addresses/:id')
  async updateAddress(
    @AuthUser() user: any,
    @Body() address: any,
    @Param('id') id: string,
  ) {
    const updatedAddress: UserAddressMagentoDto =
      await this.addressService.updateAddress(user, address, id);
    return updatedAddress;
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

  @Delete('/addresses/:id')
  async deleteAddress(
    @AuthUser() user: any,
    @Param('id') id: string,
  ): Promise<AddressDeleteMagentoDto> {
    return await this.addressService.deleteAddressById(user, id);
  }

  @Get('/orders')
  async getToken(@AuthUser() user: any): Promise<UserOrdersMagentoDto> {
    return await this.orderService.getUserOrders(user);
  }
}
