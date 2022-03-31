import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ConnectionUrl } from 'src/enum/connection.enum';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenService {
  constructor(private httpService: HttpService) {}

  async getToken(loginData): Promise<any> {
    return await this.httpService
      .post(ConnectionUrl.URL + '/integration/customer/token', loginData)
      .pipe(
        map((response) => {
          return { token: response.data };
        }),
        catchError(e => {
          throw new HttpException(e.response.data, e.response.status);
        })
      );
  }
}
