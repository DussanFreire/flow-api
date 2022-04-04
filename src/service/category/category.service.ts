import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { TokenMagentoDto } from 'src/dto/dto_magento/token.magento.dto';
import { ConnectionUrl } from 'src/enum/connection.enum';

@Injectable()
export class CategoryService {
    constructor(private httpService: HttpService){}
    async getCategories(){
    return this.httpService
      .get<TokenMagentoDto>(
        ConnectionUrl.URL + '/categories'
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
