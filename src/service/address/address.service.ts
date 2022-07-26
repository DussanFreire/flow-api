import { HttpException, Injectable } from '@nestjs/common';
import { map, catchError } from 'rxjs';
import { UserAddressFlowDto } from '../../dto/dto_flow/me/address-service/user_address.flow';
import { UserAddressesFlowDto } from '../../dto/dto_flow/me/address-service/user_addresses.flow.dto';
import { UserAddressMagentoDto } from 'src/dto/dto_magento/me/user_address.magento.dto';
import { UserInfoMagento } from '../../dto/dto_magento/me/user_info.magento.dto';
import { ConnectionUrl, Customer } from '../../enum/connection.enum';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { AddressDeleteMagentoDto } from 'src/dto/dto_magento/address_delete.magento.dto';

@Injectable()
export class AddressService {
  constructor(private httpService: HttpService) {}

  async deleteAddressById(
    user: any,
    addressId: string,
  ): Promise<AddressDeleteMagentoDto> {
    const addresses: UserAddressesFlowDto =
      await this.getUserAddressesInBolivia(user);
    if (!addresses.addresses.some((a) => a.id == parseInt(addressId))) {
      throw new HttpException(
        "This direction doesn't belongs to this user",
        400,
      );
    }
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${ConnectionUrl.ACCESS_TOKEN}`,
      },
    };
    return await this.httpService
      .delete(ConnectionUrl.URL + '/addresses/' + addressId, requestConfig)
      .pipe(
        map((response: any) => {
          const reponseStatus: AddressDeleteMagentoDto =
            new AddressDeleteMagentoDto();
          reponseStatus.response = response.data;
          return reponseStatus;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
  }

  async updateAddress(
    costumerId: string,
    address: UserAddressMagentoDto,
    id: string,
  ): Promise<UserAddressMagentoDto> {
    let userinfo = await this.getUserInfoWithAddressesInMagentoFormat(
      costumerId,
    );
    if (userinfo.customer.addresses.some((a) => a.id == parseInt(id))) {
      address.id = parseInt(id);
      for (let index = 0; index < userinfo.customer.addresses.length; index++) {
        if (userinfo.customer.addresses[index].id == parseInt(id)) {
          userinfo.customer.addresses[index] = Object.assign(address);
          userinfo.customer.addresses[index].id = parseInt(id);
        }
      }
    } else {
      throw new HttpException(
        "The direction wasn't found in the user direcctions",
        400,
      );
    }
    const requestConfig: AxiosRequestConfig = this.getRequestConfig(costumerId);
    return this.httpService
      .put(ConnectionUrl.URL + '/customers/me', userinfo, requestConfig)
      .pipe(
        map(async (response: any) => {
          let addressesBol = response.data.addresses.filter(
            (a: any) => a.country_id === 'BO',
          );
          addressesBol = addressesBol.map((a): UserAddressFlowDto => {
            const addressMagentoDto: UserAddressMagentoDto = Object.assign(a);
            const addressFlowDto: UserAddressFlowDto =
              this.transferDataToFlowDto(addressMagentoDto);
            return addressFlowDto;
          });
          return addressesBol;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
  }

  public async getUserAddressesInBolivia(
    costumerId: string,
  ): Promise<UserAddressesFlowDto> {
    const requestConfig: AxiosRequestConfig = this.getRequestConfig(costumerId);
    const addresses = new UserAddressesFlowDto();
    addresses.addresses = await this.httpService
      .get<UserAddressMagentoDto>(
        ConnectionUrl.URL + Customer.ME,
        requestConfig,
      )
      .pipe(
        map(async (response: any) => {
          let addressesBol = response.data.addresses.filter(
            (a: any) => a.country_id === 'BO',
          );
          addressesBol = addressesBol.map((a): UserAddressFlowDto => {
            const addressMagentoDto: UserAddressMagentoDto = Object.assign(a);
            const addressFlowDto: UserAddressFlowDto =
              this.transferDataToFlowDto(addressMagentoDto);
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

  public async addNewAddress(
    costumerId: string,
    newAddress: UserAddressMagentoDto,
  ): Promise<UserAddressMagentoDto> {
    let userinfo = await this.getUserInfoWithAddressesInMagentoFormat(
      costumerId,
    );
    userinfo.customer.addresses.push(newAddress);
    const requestConfig: AxiosRequestConfig = this.getRequestConfig(costumerId);
    return this.httpService
      .put(ConnectionUrl.URL + Customer.ME, userinfo, requestConfig)
      .pipe(
        map(async (response: any) => {
          let addressesBol = response.data.addresses.filter(
            (a: any) => a.country_id === 'BO',
          );
          addressesBol = addressesBol.map((a): UserAddressFlowDto => {
            const addressMagentoDto: UserAddressMagentoDto = Object.assign(a);
            const addressFlowDto: UserAddressFlowDto =
              this.transferDataToFlowDto(addressMagentoDto);
            return addressFlowDto;
          });
          return addressesBol[addressesBol.length - 1];
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
  }

  public async getUserInfoWithAddressesInMagentoFormat(
    costumerId: string,
  ): Promise<UserInfoMagento> {
    const requestConfig: AxiosRequestConfig = this.getRequestConfig(costumerId);

    return this.httpService
      .get<UserInfoMagento>(ConnectionUrl.URL + Customer.ME, requestConfig)
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
  }

  private getRequestConfig(costumerId: string): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    return config;
  }

  private transferDataToFlowDto(
    addressMagentoDto: UserAddressMagentoDto,
  ): UserAddressFlowDto {
    const addressFlowDto: UserAddressFlowDto = new UserAddressFlowDto();
    addressFlowDto.id = addressMagentoDto.id;
    addressFlowDto.firstname = addressMagentoDto.firstname;
    addressFlowDto.lastname = addressMagentoDto.lastname;
    addressFlowDto.telephone = addressMagentoDto.telephone;
    addressFlowDto.city = addressMagentoDto.city;
    addressFlowDto.street = addressMagentoDto.street;
    addressFlowDto.country = 'Bolivia';
    addressFlowDto.region = addressMagentoDto.region.region;
    if (addressMagentoDto.custom_attributes !== undefined) {
      addressMagentoDto.custom_attributes.forEach((c) => {
        if (c.attribute_code === 'lat') {
          addressFlowDto.lat = c.value;
        }
        if (c.attribute_code === 'lng') {
          addressFlowDto.lng = c.value;
        }
      });
    }
    return addressFlowDto;
  }
}
