import { ConnectionUrl, FilterProducts } from 'src/enum/connection.enum';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Res } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { CategoryDtoMagento } from 'src/dto/dto_magento/category.magento.dto';
import { CategoryListMagentoDto } from 'src/dto/dto_magento/category_list.magento.dto';

@Injectable()
export class ProductService {
    constructor(private httpService: HttpService) {}
    public async getProductByCategoryID(idcategory: number) {
        const products =  await this.httpService
          .get<any>(ConnectionUrl.URL + FilterProducts.PRODUCTS_CATEGORY_ID + idcategory)
          .pipe(
            map((response: any) => {
                console.log(response.data.items);
                
              return response.data.items;
            }),
            catchError((e) => {
              throw new HttpException(e.response.data, e.response.status);
            }),
          )
          .toPromise();
    
        // const filteredCategories = this.filterByActiveCateogries(
        //   categories.categoryList.filter((c) => c.name != 'Lo Nuevo'),
        // );
    
        return JSON.stringify(products, [
          'id',
          'sku',
          'name',
          'price',
        ]);
      }
}
