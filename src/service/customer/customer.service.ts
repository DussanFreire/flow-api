import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ConnectionUrl } from '../../enum/connection.enum';
import { catchError } from 'rxjs/operators';
import { CustomerMagentoDto } from '../../dto/dto_magento/customer/customer.magento.dto';
import { CustomerFlowDto } from '../../dto/dto_flow/customer/customer.flow.dto';

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
      .post(ConnectionUrl.URL + '/customers', magentoCostumer, requestConfig)
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
      .get(ConnectionUrl.URL + '/customers/me', requestConfig)
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
}
