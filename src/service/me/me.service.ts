import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { CartFlowDto } from 'src/dto/dto_flow/cart.flow.dto';
import { CartService } from '../cart/cart.service';
import { CategoryService } from '../category/category.service';
import { AxiosRequestConfig } from 'axios';
import { ConnectionUrl } from 'src/enum/connection.enum';
import { catchError, filter, map } from 'rxjs';
import { UserInfoFlowDto } from 'src/dto/dto_flow/user_info.flow.dto';
import { UserAddressFlowDto } from 'src/dto/dto_flow/user_address.flow';
import { UserAddressMagentoDto } from 'src/dto/dto_magento/user_address.magento.dto';

@Injectable()
export class MeService {
  constructor(
    private httpService: HttpService,
    private cartService: CartService,
    private categoryService: CategoryService,
  ) {}
  //   /customers/me
  async getLoginInfo(token: string) {
    const loginPromises = [
      this.categoryService.getCategories(),
      this.cartService.getCart(token),
      this.getUserId(token),
    ];
    const [categories, cart, user_info] = await Promise.all(loginPromises);
    const items_count = (cart as CartFlowDto).cart.items_count;
    const cart_id = (cart as CartFlowDto).cart.id;
    const cart_info = {
      cart_id,
      items_count,
    };

    return { cart_info, user_info, categories };
  }

  async getUserAddressesInBolivia(
    costumerId: string,
  ): Promise<UserAddressFlowDto[]> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };

    const addresses: UserAddressFlowDto[] = await this.httpService
      .get<UserAddressMagentoDto>(
        ConnectionUrl.URL + '/customers/me',
        requestConfig,
      )
      .pipe(
        map(async (response: any) => {
          let addressesBol = response.data.addresses.filter(
            (a: any) => a.country_id === 'BO',
          );
          addressesBol = addressesBol.map((a) => {
            const addressMagentoDto: UserAddressMagentoDto = Object.assign(a);
            const addressFlowDto: UserAddressFlowDto = new UserAddressFlowDto();

            addressFlowDto.id = addressMagentoDto.id;
            addressFlowDto.telephone = addressMagentoDto.telephone;
            addressFlowDto.city = addressMagentoDto.city;
            addressFlowDto.street = addressMagentoDto.street;
            addressFlowDto.country = 'Bolivia';
            addressFlowDto.region = addressMagentoDto.region.region;

            return addressFlowDto;
          });
          return addressesBol;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return addresses;
  }

  private async getUserId(costumerId: string): Promise<UserInfoFlowDto> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };

    const userInfo = await this.httpService
      .get<UserInfoFlowDto>(ConnectionUrl.URL + '/customers/me', requestConfig)
      .pipe(
        map(async (response: any) => {
          const userDto: UserInfoFlowDto = new UserInfoFlowDto();
          userDto.id_user = response.data.id;
          userDto.email = response.data.email;
          userDto.firstname = response.data.firstname;
          userDto.lastname = response.data.lastname;
          return userDto;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return userInfo;
  }
}
