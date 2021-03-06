import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { ConnectionUrl } from 'src/enum/connection.enum';
import { catchError } from 'rxjs/operators';
import { LoginFlowDto } from 'src/dto/dto_flow/login.flow.dto';
import { TokenMagentoDto } from 'src/dto/dto_magento/token.magento.dto';

@Injectable()
export class TokenService {
  constructor(private httpService: HttpService) {}

  getToken(loginData: LoginFlowDto): Promise<TokenMagentoDto> {
    return this.httpService
      .post<TokenMagentoDto>(
        ConnectionUrl.URL + '/integration/customer/token',
        loginData,
      )
      .pipe(
        map((response: any) => {
          const res = new TokenMagentoDto(response.data);
          return res;
        }),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      )
      .toPromise();
  }
}
