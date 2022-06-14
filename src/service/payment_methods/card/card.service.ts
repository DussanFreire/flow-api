import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { CredentialBank } from 'src/enum/credential.enum';
import { AxiosRequestConfig } from 'axios';
import { catchError, map } from 'rxjs';
import { CardPaymentConfirm, CardPaymentConsult, CardPaymentPreparation, CardPaymentReturn } from 'src/enum/connection.enum';

@Injectable()
export class CardService {
    constructor(private httpService: HttpService,) { }

    async preparationCard(data): Promise<any> {
        const requestConfig: AxiosRequestConfig = {
            auth: {
                username: CredentialBank.username,
                password: CredentialBank.password
            }
        };
        return await this.httpService
            .post(CardPaymentPreparation.SANBOX_URI, data, requestConfig)
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

    async confirmCard(data): Promise<any> {
        const requestConfig: AxiosRequestConfig = {
            auth: {
                username: CredentialBank.username,
                password: CredentialBank.password
            }
        };
        return await this.httpService
            .post(CardPaymentConfirm.SANBOX_URI, data, requestConfig)
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

    async returnCard(data): Promise<any> {
        const requestConfig: AxiosRequestConfig = {
            auth: {
                username: CredentialBank.username,
                password: CredentialBank.password
            }
        };
        return await this.httpService
            .post(CardPaymentReturn.SANBOX_URI, data, requestConfig)
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

    async consultCard(data): Promise<any> {
        const requestConfig: AxiosRequestConfig = {
            auth: {
                username: CredentialBank.username,
                password: CredentialBank.password
            }
        };
        return await this.httpService
            .post(CardPaymentConsult.SANBOX_URI, data, requestConfig)
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
