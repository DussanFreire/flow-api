import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ConnectionUrl } from 'src/enum/connection.enum';

@Injectable()
export class LoginService {
  constructor(private httpService: HttpService) {}

  async loginCustomer(loginData): Promise<any> {
    return await this.httpService
      .post(ConnectionUrl.URL + '/integration/customer/token', loginData)
      .pipe(
        map((response) => {
          return { token: response.data };
        }),
      );
  }
}
