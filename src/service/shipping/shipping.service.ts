import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { catchError, map } from 'rxjs';
import { CartShippingFlowDto } from 'src/dto/dto_flow/cart_shipping_cost.flow.dto';
import { ShippingDataMagentoDto } from 'src/dto/dto_magento/shipping_data.megento.dto';
import { ConnectionUrl } from 'src/enum/connection.enum';

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
    shippingData.address_id = addressId;

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
}
