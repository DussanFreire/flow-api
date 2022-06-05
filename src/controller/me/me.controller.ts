import { Body, Controller, Get, Put } from '@nestjs/common';
import { AuthUser } from 'src/decorator/user.decorator';
import { UserAddressMagentoDto } from 'src/dto/dto_magento/user_address.magento.dto';
import { MeService } from 'src/service/me/me.service';

@Controller('me')
export class MeController {
  constructor(private meService: MeService) {}

  @Get()
  async getUserInfo(@AuthUser() user: any) {
    return await this.meService.getLoginInfo(user);
  }

  @Get('/addresses')
  async getUserAddressesInBolivia(@AuthUser() user: any) {
    return await this.meService.getUserAddressesInBolivia(user);
  }

  @Put('/addresses')
  async addNewAddres(@AuthUser() user: any,@Body() address: UserAddressMagentoDto) {
    return await this.meService.addNewAddres(user, address);
  }
}
