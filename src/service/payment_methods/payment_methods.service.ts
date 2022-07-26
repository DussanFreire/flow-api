import { HttpException, Injectable } from '@nestjs/common';
import { map, catchError } from 'rxjs';
import { ConnectionUrl, Cart } from '../../enum/connection.enum';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class PaymentMethodsService {
  constructor(private httpService: HttpService) {}
  public async getPaymentMethodsInfo(costumerId: string) {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const url = ConnectionUrl.URL + Cart.PAYMENTMETHODS;
    const paymentmethods = await this.httpService
      .get(url, requestConfig)
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
