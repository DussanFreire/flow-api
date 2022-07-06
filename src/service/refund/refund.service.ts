import { HttpException, Injectable } from '@nestjs/common';
import { map, catchError } from 'rxjs';
import { ConnectionUrl, Cart } from 'src/enum/connection.enum';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RefundService {
  constructor(private httpService: HttpService) {}

  public async generateRefund(order: string) {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${ConnectionUrl.ACCESS_TOKEN}`,
      },
    };
    const url = ConnectionUrl.URL + Cart.ORDER + order + Cart.REFUND;
    const responseInvoice = await this.httpService
      .post(url, null, requestConfig)
      .pipe(
        map((response: any) => {
          const invoice = response.data;
          return invoice;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
    return responseInvoice;
  }
}
