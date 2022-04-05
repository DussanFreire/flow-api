import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Res } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { catchError, map } from 'rxjs';
import { TokenMagentoDto } from 'src/dto/dto_magento/token.magento.dto';
import { ConnectionUrl } from 'src/enum/connection.enum';
@Injectable()
export class CategoryService {
    constructor(private httpService: HttpService){}
    async getCategories(){
    const resp =  await this.httpService
    .get<TokenMagentoDto>(
      ConnectionUrl.URL + '/categories'
    )
    .pipe(
      map((response: any) => {
        const res = new TokenMagentoDto(response.data.children_data);
        return res;
      }),
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    )
    .toPromise();
    const sort = resp.token.sort(function(a, b) {
      return a['id'] - b['id'];
    });
    let actives = sort.filter(item => item['is_active'] == true);
    return JSON.stringify(actives,['id','name','is_active','children_data']);
    
  }
}
