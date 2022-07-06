import { HttpException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { map, catchError } from 'rxjs';
import { PaymentInformationDto } from 'src/dto/dto_magento/cart.payment_info.dto';
import { OrderMagentoDto } from 'src/dto/dto_magento/order.magento.dto';
import { ConnectionUrl, Cart } from 'src/enum/connection.enum';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class OrderService {
  constructor(private httpService: HttpService) {}
  public async generateOrder(
    costumerId: string,
    paymentInformation: PaymentInformationDto,
  ): Promise<OrderMagentoDto> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const url = ConnectionUrl.URL + Cart.PAYMENT_INFORMATION;
    const responsePaymentInformation = await this.httpService
      .post(url, paymentInformation, requestConfig)
      .pipe(
        map((response: any) => {
          const orderInfo: OrderMagentoDto = new OrderMagentoDto();

          orderInfo.order_id = response.data;
          return orderInfo;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
    return responsePaymentInformation;
  }
}
