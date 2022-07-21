import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthUser } from 'src/decorator/user.decorator';
import { UserAddressMagentoDto } from 'src/dto/dto_magento/user_address.magento.dto';
import { UserOrdersMagentoDto } from 'src/dto/dto_magento/user_orders.magento.dto';
import { AddressService } from 'src/service/address/address.service';
import { MeService } from 'src/service/me/me.service';
import { OrderService } from 'src/service/order/order.service';

@Controller('me')
export class MeController {
  constructor(
    private meService: MeService,
    private addressService: AddressService,
    private orderService: OrderService,
  ) {}

  @Get()
  async getUserInfo(@AuthUser() user: any) {
    return await this.meService.getLoginInfo(user);
  }

  @Get('/addresses')
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
  async addNewAddress(@AuthUser() user: any, @Body() address) {
    const newAddress: UserAddressMagentoDto =
      await this.addressService.addNewAddress(user, address);
    return newAddress;
  }

  @Get('/orders')
  async getToken(@AuthUser() user: any): Promise<UserOrdersMagentoDto> {
    return await this.orderService.getUserOrders(user);
  }
}
