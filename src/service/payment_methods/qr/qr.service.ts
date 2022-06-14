import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { QrConsult, QrGeneration, QrUpdate } from 'src/enum/connection.enum';
import { catchError } from 'rxjs/operators';
import { CredentialBank } from 'src/enum/credential.enum';
@Injectable()
export class QrService {
    constructor(private httpService: HttpService,){}

    async generateQr(data): Promise<any>{
        const requestConfig: AxiosRequestConfig = {
            auth: {
                username: CredentialBank.username,
                password: CredentialBank.password
            }
        };
        return await this.httpService
        .post(QrGeneration.SANBOX_URI , data, requestConfig)
        .pipe(
        map((response) => {
          return response;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
    }
    async consultQr(data): Promise<any>{
        const requestConfig: AxiosRequestConfig = {
            auth: {
                username: CredentialBank.username,
                password: CredentialBank.password
            }
        };
        return await this.httpService
        .post(QrConsult.SANBOX_URI , data, requestConfig)
        .pipe(
        map((response) => {
          return response;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
    }

    async updateQr(data): Promise<any>{
      const requestConfig: AxiosRequestConfig = {
          auth: {
              username: CredentialBank.username,
              password: CredentialBank.password
          }
      };
      return await this.httpService
      .post(QrUpdate.SANBOX_URI , data, requestConfig)
      .pipe(
      map((response) => {
        return response;
      }),
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    )
    .toPromise();
  }
}
