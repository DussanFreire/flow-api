import { HttpException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { map, catchError } from 'rxjs';
import { ShipmentMagentoDto } from 'src/dto/dto_magento/shipment.magento.dto';
import { ConnectionUrl, Cart } from 'src/enum/connection.enum';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class ShipmentService {
  constructor(private httpService: HttpService) {}

  public async generateShipment(order: string): Promise<ShipmentMagentoDto> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${ConnectionUrl.ACCESS_TOKEN}`,
      },
    };
    const url = ConnectionUrl.URL + Cart.ORDER + order + Cart.SHIP;
    const responseInvoice = await this.httpService
      .post(url, null, requestConfig)
      .pipe(
        map((response: any) => {
          const shipment: ShipmentMagentoDto = new ShipmentMagentoDto();
          shipment.shipment_id = response.data;
          return shipment;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
    return responseInvoice;
  }
}
