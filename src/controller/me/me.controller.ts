import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AuthUser } from 'src/decorator/user.decorator';
import { UserAddressMagentoDto } from 'src/dto/dto_magento/user_address.magento.dto';
import { AddressService } from 'src/service/address/address.service';
import { MeService } from 'src/service/me/me.service';

@Controller('me')
export class MeController {
  constructor(
    private meService: MeService,
    private addressService: AddressService,
  ) {}

  @Get()
  async getUserInfo(@AuthUser() user: any) {
    return await this.meService.getLoginInfo(user);
  }

  @Get('/addresses')
  async getUserAddressesInBolivia(@AuthUser() user: any) {
    return await this.addressService.getUserAddressesInBolivia(user);
  }

  @Post('/addresses')
  async addNewAddres(@AuthUser() user: any, @Body() address) {
    const newAddress: UserAddressMagentoDto =
      await this.addressService.addNewAddress(user, address);
    return newAddress;
  }
}
