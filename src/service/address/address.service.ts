import { HttpException, Injectable } from '@nestjs/common';
import { map, catchError } from 'rxjs';
import { UserAddressFlowDto } from 'src/dto/dto_flow/user_address.flow';
import { UserAddressesFlowDto } from 'src/dto/dto_flow/user_addresses.flow.dto';
import { UserAddressMagentoDto } from 'src/dto/dto_magento/user_address.magento.dto';
import { UserInfoMagento } from 'src/dto/dto_magento/user_info.magento.dto';
import { ConnectionUrl } from 'src/enum/connection.enum';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios/dist/http.service';

@Injectable()
export class AddressService {
  constructor(private httpService: HttpService) {}

  public async getUserAddressesInBolivia(
    costumerId: string,
  ): Promise<UserAddressesFlowDto> {
    const requestConfig: AxiosRequestConfig = this.getRequestConfig(costumerId);
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
    addressFlowDto.name = `${addressMagentoDto.firstname} ${addressMagentoDto.lastname}`;
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
