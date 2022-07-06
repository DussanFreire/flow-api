import { HttpException, Injectable } from '@nestjs/common';
import { map, catchError } from 'rxjs';
import { InvoiceDto } from 'src/dto/dto_magento/cart.invoice.magento.dto';
import { InvoiceMagentoDto } from 'src/dto/dto_magento/invoice.magento.dto';
import { ConnectionUrl, Cart } from 'src/enum/connection.enum';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class InvoiceService {
  constructor(private httpService: HttpService) {}

  public async generateInvoce(
    data: InvoiceDto,
    orderId: string,
  ): Promise<InvoiceMagentoDto> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${ConnectionUrl.ACCESS_TOKEN}`,
      },
    };
    const url = ConnectionUrl.URL + Cart.ORDER + orderId + Cart.INVOICE;
    const responseInvoice: InvoiceMagentoDto = await this.httpService
      .post(url, data, requestConfig)
      .pipe(
        map((response: any) => {
          const invoice: InvoiceMagentoDto = new InvoiceMagentoDto();
          invoice.invoice_id = response.data;
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
