import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { ConnectionUrl, Customer } from '../../enum/connection.enum';
import { catchError } from 'rxjs/operators';
import { CustomerMagentoDto } from '../../dto/dto_magento/customer/customer.magento.dto';
import { CustomerFlowDto } from '../../dto/dto_flow/customer/customer.flow.dto';
import { ForgotPassword } from '../../dto/dto_magento/customer/forgot.password.magento.dto';
import { ResetPassword } from '../../dto/dto_magento/customer/reset.password.magento.dto';

@Injectable()
export class CustomerService {
  constructor(private httpService: HttpService) {}

  async createCustomer(
    dataCustomer: CustomerFlowDto,
  ): Promise<CustomerFlowDto> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${ConnectionUrl.ACCESS_TOKEN}`,
      },
    };
    const magentoCostumer = new CustomerMagentoDto();

    const costumer = {
      firstname: dataCustomer.firstName,
      email: dataCustomer.email,
      dob: dataCustomer.dob,
      lastname: dataCustomer.lastName,
    };
    magentoCostumer.customer = costumer;
    magentoCostumer.password = dataCustomer.password;

    return this.httpService
      .post(ConnectionUrl.URL + Customer.CUSTOMER, magentoCostumer, requestConfig)
      .pipe(
        map((response) => {
          const flowCostumer = new CustomerFlowDto(
            response.data.email,
            response.data.firstname,
            response.data.lastname,
            response.data.dob,
          );
          return flowCostumer;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
  }
 async getInfo(token : string): Promise<CustomerFlowDto> {
  const requestConfig: AxiosRequestConfig = {
    headers: {
      Authorization: token,
    },
  };
  
  return this.httpService
      .get(ConnectionUrl.URL + Customer.ME, requestConfig)
      .pipe(
        map((response) => {
          const flowCostumer = new CustomerFlowDto(
            response.data.email,
            response.data.firstname,
            response.data.lastname,
            response.data.dob,
          );
          return flowCostumer;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
 }
 async forgotPassword(data: ForgotPassword){
  const url = ConnectionUrl.URL_PROD + Customer.FORGOT_PASSWORD;
  return this.httpService
      .put(url, data)
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
 }

 async resetPassword(data: ResetPassword){
  const url = ConnectionUrl.URL_PROD + Customer.RESET_PASSWORD;
  return this.httpService
      .post(url, data)
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
 }
}
