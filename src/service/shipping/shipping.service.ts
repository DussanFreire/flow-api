import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { catchError, map } from 'rxjs';
import { CartShippingFlowDto } from 'src/dto/dto_flow/cart_shipping_cost.flow.dto';
import { InvoiceDto } from 'src/dto/dto_magento/cart.invoice.magento.dto';
import { PaymentInformationDto } from 'src/dto/dto_magento/cart.payment_info.dto';
import { CartShippingInformationDto } from 'src/dto/dto_magento/cart.shipping-information.magento.dto';
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

  public async setShippingBillingAddress(costumerId: string, shippingBillingAddress: CartShippingInformationDto){
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const url = ConnectionUrl.URL + Cart.SET_SHIPPING_BILLING_ADDRESS;
    const responseShippingBillingAddress = await this.httpService
    .post(url,shippingBillingAddress,requestConfig)
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

  public async generateOrder(costumerId: string, paymentInformation: PaymentInformationDto){
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: costumerId,
      },
    };
    const url = ConnectionUrl.URL + Cart.PAYMENT_INFORMATION;
    const responsePaymentInformation = await this.httpService
    .post(url,paymentInformation,requestConfig)
    .pipe(
      map((response: any) => {
        const paymentInformation = response.data;
        return paymentInformation;
      }),
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    )
    .toPromise();
    return responsePaymentInformation;
  }

  public async generateInvoce(data: InvoiceDto, order: string){
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${ConnectionUrl.ACCESS_TOKEN}`,
      },
    };
    const url = ConnectionUrl.URL + Cart.ORDER + order + Cart.INVOICE;
    const responseInvoice = await this.httpService
    .post(url,data,requestConfig)
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

  public async generateShipment(order: string){
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${ConnectionUrl.ACCESS_TOKEN}`,
      },
    };
    const url = ConnectionUrl.URL + Cart.ORDER + order + Cart.SHIP;
    const responseInvoice = await this.httpService
    .post(url,null ,requestConfig)
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

  public async generateRefund(order: string){
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
