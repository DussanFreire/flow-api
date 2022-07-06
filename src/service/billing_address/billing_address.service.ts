import { HttpException, Injectable } from '@nestjs/common';
import { map, catchError } from 'rxjs';
import { CartShippingInformationDto } from 'src/dto/dto_magento/cart.shipping_information.magento.dto';
import { ConnectionUrl, Cart } from 'src/enum/connection.enum';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BillingAddressService {
  constructor(private httpService: HttpService) {}
  public async setShippingBillingAddress(
    costumerId: string,
    shippingBillingAddress: CartShippingInformationDto,
  ) {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const url = ConnectionUrl.URL + Cart.SET_SHIPPING_BILLING_ADDRESS;
    const responseShippingBillingAddress = await this.httpService
      .post(url, shippingBillingAddress, requestConfig)
      .pipe(
        map((response: any) => {
          const shippingBillingAddress = response.data;
          return shippingBillingAddress;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
    return responseShippingBillingAddress;
  }
}
