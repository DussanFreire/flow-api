import { HttpException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { map, catchError } from 'rxjs';
import { PaymentInformationDto } from 'src/dto/dto_magento/cart/cart.payment_info.dto';
import { OrderMagentoDto } from '../../dto/dto_magento/cart/order.magento.dto';
import { ConnectionUrl, Cart } from '../../enum/connection.enum';
import { HttpService } from '@nestjs/axios';
import { UserOrdersMagentoDto } from 'src/dto/dto_magento/user_orders.magento.dto';
import { MeService } from '../me/me.service';
@Injectable()
export class OrderService {
  constructor(private httpService: HttpService, private meService: MeService) {}

  public async getUserOrders(
    costumerId: string,
  ): Promise<UserOrdersMagentoDto> {
    const userInfo = await this.meService.getUserId(costumerId);
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${ConnectionUrl.ACCESS_TOKEN}`,
      },
    };
    const url = ConnectionUrl.URL + Cart.USER_ORDER + userInfo.email;
    const responseOrders: UserOrdersMagentoDto = await this.httpService
      .get(url, requestConfig)
      .pipe(
        map((response: any) => {
          const userOrdes: UserOrdersMagentoDto = new UserOrdersMagentoDto();
          userOrdes.items = response.data['items'];
          return userOrdes;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
    return responseOrders;
  }

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
