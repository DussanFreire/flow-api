import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { catchError, map } from 'rxjs';
import { CartShippingFlowDto } from 'src/dto/dto_flow/cart_shipping_cost.flow.dto';
import { ShippingDataMagentoDto } from 'src/dto/dto_magento/shipping_data.megento.dto';
import { Cart, ConnectionUrl } from 'src/enum/connection.enum';

@Injectable()
export class ShippingService {
  constructor(private httpService: HttpService) {}

  public async getShippingInfo(costumerId: string, addressId: string) {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const shippingData = new ShippingDataMagentoDto();
    shippingData.addressId = addressId;

    const url =
      ConnectionUrl.URL + '/carts/mine/estimate-shipping-methods-by-address-id';

    const shippingResults = await this.httpService
      .post(url, shippingData, requestConfig)
      .pipe(
        map((response: any) => {
          const shippingInfo = new CartShippingFlowDto();
          shippingInfo.methods = response.data.map((s) => s);
          return shippingInfo;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();

    return shippingResults;
  }
  public async getPaymentMethodsInfo(costumerId: string){
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const url =
      ConnectionUrl.URL + Cart.PAYMENTMETHODS;
    const paymentmethods = await this.httpService
    .get(url,requestConfig)
    .pipe(
      map((response: any) => {
        const paymentMethodsResult = response.data;
        return paymentMethodsResult;
      }),
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    )
    .toPromise();
    return paymentmethods;
  }

  public async setPaymentInfo(costumerId: string, info){
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const url =
      ConnectionUrl.URL + Cart.SET_PAYMENT_METHOD;
    const paymentmethods = await this.httpService
    .post(url, info, requestConfig)
    .pipe(
      map((response: any) => {
        const paymentMethodsResult = response.data;
        return paymentMethodsResult;
      }),
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    )
    .toPromise();
    return paymentmethods;
  }
}
