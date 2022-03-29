import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ConnectionUrl } from 'src/enum/connection.enum';

@Injectable()
export class RegisterService {
  constructor(private httpService: HttpService) {}

  async createCustomer(
    dataCustomer,
  ): Promise<Observable<AxiosResponse<any, any>>> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${ConnectionUrl.ACCESS_TOKEN}`,
      },
    };
    const obj = {
      customer: {
        email: dataCustomer.email,
        firstname: dataCustomer.firstname,
        lastname: dataCustomer.lastname,
        dob: dataCustomer.dob,
      },
      password: dataCustomer.password,
    };
    return await this.httpService
      .post(ConnectionUrl.URL + '/customers', obj, requestConfig)
      .pipe(
        map((response) => {
          return response.data;
        }),
      );
  }
}
