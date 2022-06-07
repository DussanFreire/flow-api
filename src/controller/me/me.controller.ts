import { Body, Controller, Get } from '@nestjs/common';
import { AuthUser } from 'src/decorator/user.decorator';
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
}
