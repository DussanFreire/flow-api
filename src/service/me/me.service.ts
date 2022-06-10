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
import { UserAddressesFlowDto } from 'src/dto/dto_flow/user_addresses.flow.dto';
import { UserInfoMagento } from 'src/dto/dto_magento/user_info.magento.dto';
import { stringify } from 'flatted';

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
    const items_qty = (cart as CartFlowDto).cart.items_qty;
    const cart_id = (cart as CartFlowDto).cart.id;
    const cart_info = {
      cart_id,
      items_qty,
    };

    return { cart_info, user_info, categories };
  }

  async getUserAddressesInBolivia(
    costumerId: string,
  ): Promise<UserAddressesFlowDto> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const addresses = new UserAddressesFlowDto();
    addresses.addresses = await this.httpService
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
            addressFlowDto.name = `${addressMagentoDto.firstname} ${addressMagentoDto.lastname}`;
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

  async addNewAddress(
    costumerId: string,
    newAddress: UserAddressMagentoDto,
  ): Promise<UserAddressMagentoDto> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };

    let userinfo = await this.httpService
      .get<UserInfoMagento>(ConnectionUrl.URL + '/customers/me', requestConfig)
      .pipe(
        map(async (response: any) => {
          const customerInfo: UserInfoMagento = new UserInfoMagento();
          customerInfo.customer = {
            email: response.data.email,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            website_id: response.data.website_id,
            addresses: response.data.addresses,
          };
          return customerInfo;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
    userinfo.customer.addresses.push(newAddress);
    return this.httpService
      .put(ConnectionUrl.URL + '/customers/me', userinfo, requestConfig)
      .pipe(
        map(async (response: any) => {
          const newCustomerInfo: UserInfoMagento = new UserInfoMagento();
          newCustomerInfo.customer = {
            email: response.data.email,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            website_id: response.data.website_id,
            addresses: response.data.addresses,
          };
          return newCustomerInfo.customer.addresses[
            response.data.addresses.length - 1
          ];
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
  }
}
