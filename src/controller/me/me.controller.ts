import { Body, Controller, Get, Post, Put } from '@nestjs/common';
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

@ApiTags('Me')
@ApiBearerAuth()
@Controller('me')
export class MeController {
  constructor(
    private meService: MeService,
    private addressService: AddressService,
  ) {}

  @Get()
  @ApiOperation({summary: 'Get login info.'})
  @ApiCreatedResponse({description: 'OK response.'})
  @ApiUnauthorizedResponse({description: 'Not provided, invalid or expired token.'})
  @ApiBadRequestResponse({description:'Bad request.'})
  async getUserInfo(@AuthUser() user: any) {
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
}
