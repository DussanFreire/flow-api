import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AuthUser } from '../../decorator/user.decorator';
import { UserAddressMagentoDto } from '../../dto/dto_magento/me/user_address.magento.dto';
import { AddressService } from '../../service/address/address.service';
import { MeService } from '../../service/me/me.service';

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
  async addNewAddres(@AuthUser() user: any, @Body() address: UserAddressMagentoDto) {
    return await this.addressService.addNewAddress(user, address);
  }
}
